const path = require("path");
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const env = require("../config/env");
const imageModel = require("../models/imageModel");
const analyticsModel = require("../models/analyticsModel");
const AppError = require("../utils/AppError");
const { isDatabaseUnavailable } = require("../utils/databaseError");
const demoStore = require("../utils/demoStore");

const fileToPublicUrl = (file) => {
  if (file.location) return file.location;
  if (file.path && (file.path.startsWith("http://") || file.path.startsWith("https://"))) return file.path;

  const relative = path.relative(process.cwd(), file.path).replace(/\\/g, "/");
  return `${env.apiBaseUrl}/${relative}`;
};

const createUploadedImage = async (userId, file, payload) => {
  if (!file) throw new AppError("Image file is required", 400);

  try {
    const image = await imageModel.create({
      userId,
      title: payload.title,
      caption: payload.caption || "",
      imageUrl: fileToPublicUrl(file),
      sourceType: "upload",
      tags: payload.tags || []
    });

    await analyticsModel.createEvent({ userId, imageId: image.id, eventType: "upload" });
    return image;
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return demoStore.createImage({
        userId,
        title: payload.title,
        caption: payload.caption || "",
        imageUrl: fileToPublicUrl(file),
        sourceType: "upload",
        tags: payload.tags || []
      });
    }
    throw error;
  }
};

const createGeneratedImage = async (userId, payload, imageUrl) => {
  try {
    const image = await imageModel.create({
      userId,
      title: payload.title || "Untitled AI Creation",
      caption: payload.caption || "",
      imageUrl,
      sourceType: "ai_generated",
      aiPrompt: payload.prompt,
      aiStyle: payload.style,
      tags: payload.tags || []
    });

    await analyticsModel.createEvent({ userId, imageId: image.id, eventType: "generate_image" });
    return image;
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return demoStore.createImage({
        userId,
        title: payload.title || "Untitled AI Creation",
        caption: payload.caption || "",
        imageUrl,
        sourceType: "ai_generated",
        aiPrompt: payload.prompt,
        aiStyle: payload.style,
        tags: payload.tags || []
      });
    }
    throw error;
  }
};

const getImage = async (id, viewerId = null, ipAddress = null) => {
  try {
    const vId = viewerId || 0;
    const image = await imageModel.findById(id, vId);
    if (!image) throw new AppError("Image not found", 404);

    await imageModel.incrementCounter(id, "view_count", 1);
    await analyticsModel.createEvent({ userId: viewerId, imageId: id, eventType: "view", ipAddress });

    return imageModel.findById(id, vId);
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      const image = demoStore.getImage(id);
      image.viewCount += 1;
      return image;
    }
    throw error;
  }
};

const listFeed = async (viewerId, limit, offset, type = 'explore') => {
  try {
    return await imageModel.listFeed(viewerId, limit, offset, type);
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      const allImages = demoStore.getImages();
      if (type === 'followed') {
        // Return a distinct curated subset for the feed so it differs from explore
        const curated = allImages.filter((_, i) => i % 2 !== 0);
        return curated.slice(offset, offset + limit);
      }
      return allImages.slice(offset, offset + limit);
    }
    throw error;
  }
};

const deleteImage = async (id, userId) => {
  try {
    const image = await imageModel.findById(id);
    if (!image) throw new AppError("Image not found", 404);
    if (Number(image.userId) !== Number(userId)) {
      throw new AppError("You can only delete your own creations", 403);
    }
    await imageModel.softDelete(id);

    if (image.imageUrl && image.imageUrl.includes("amazonaws.com")) {
      try {
        const s3 = new S3Client({
          credentials: {
            accessKeyId: env.aws.accessKeyId,
            secretAccessKey: env.aws.secretAccessKey,
          },
          region: env.aws.region,
        });
        const urlObj = new URL(image.imageUrl);
        const key = urlObj.pathname.substring(1);
        await s3.send(new DeleteObjectCommand({
          Bucket: env.aws.bucketName,
          Key: key
        }));
      } catch (s3Err) {
        console.error("Failed to delete from S3:", s3Err.message);
      }
    }
  } catch (error) {
    if (isDatabaseUnavailable(error)) {
      return;
    }
    throw error;
  }
};

const nukeBadImages = async () => {
  return await imageModel.nukeBadImages();
};

module.exports = {
  createUploadedImage,
  createGeneratedImage,
  getImage,
  listFeed,
  deleteImage,
  nukeBadImages
};

const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const env = require("../config/env");
const AppError = require("../utils/AppError");

let storage;
let isS3 = false;

// Check if AWS configurations are set
if (
  env.aws &&
  env.aws.accessKeyId &&
  env.aws.secretAccessKey &&
  env.aws.bucketName &&
  env.aws.region
) {
  try {
    const { S3Client } = require("@aws-sdk/client-s3");
    const multerS3 = require("multer-s3");

    const s3 = new S3Client({
      credentials: {
        accessKeyId: env.aws.accessKeyId,
        secretAccessKey: env.aws.secretAccessKey,
      },
      region: env.aws.region,
    });

    storage = multerS3({
      s3: s3,
      bucket: env.aws.bucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        cb(null, `uploads/${uuid()}${extension}`);
      },
    });
    isS3 = true;
    console.log("AWS S3 storage configured successfully for upload middleware.");
  } catch (err) {
    console.error("Failed to configure AWS S3 storage, falling back to local storage:", err.message);
  }
}

if (!isS3) {
  const uploadPath = path.resolve(process.cwd(), env.uploadDir);
  fs.mkdirSync(uploadPath, { recursive: true });

  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname).toLowerCase();
      cb(null, `${uuid()}${extension}`);
    }
  });
  console.log("Local disk storage configured for upload middleware.");
}

const fileFilter = (req, file, cb) => {
  if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype)) {
    return cb(new AppError("Only JPEG, PNG, WEBP, and GIF images are allowed", 415));
  }
  cb(null, true);
};

const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.maxUploadMb * 1024 * 1024
  }
}).single("image");

const { fromFile } = require("file-type");

const validateMagicBytes = async (req, res, next) => {
  if (!req.file) return next();
  
  try {
    if (req.file.path) {
      const type = await fromFile(req.file.path);
      if (!type || !type.mime.startsWith("image/")) {
        const fs = require("fs");
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        return next(new AppError("Invalid file signature. Only actual images are allowed.", 400));
      }
    }
    next();
  } catch (err) {
    return next(new AppError("Failed to validate file type", 500));
  }
};

module.exports = {
  uploadImage,
  validateMagicBytes,
  isS3Mode: () => isS3
};

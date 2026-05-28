const imageService = require("../services/imageService");
const { success } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { getPagination } = require("../utils/pagination");

const upload = asyncHandler(async (req, res) => {
  const image = await imageService.createUploadedImage(req.user.id, req.file, req.validated.body);
  success(res, { image }, "Image uploaded", 201);
});

const getImage = asyncHandler(async (req, res) => {
  const viewerId = req.user ? req.user.id : null;
  const image = await imageService.getImage(req.validated.params.id, viewerId, req.ip);
  success(res, { image });
});

const feed = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.validated.query);
  const type = req.validated.query.type || 'explore';
  const userId = req.user ? req.user.id : null;
  const images = await imageService.listFeed(userId, limit, offset, type);
  success(res, { images }, "Feed loaded", 200, { page, limit });
});

const deleteImage = asyncHandler(async (req, res) => {
  await imageService.deleteImage(req.validated.params.id, req.user.id);
  success(res, null, "Image deleted");
});

const searchImages = asyncHandler(async (req, res) => {
  const { page, limit, offset } = getPagination(req.query);
  const term = req.query.q || '';
  const viewerId = req.user ? req.user.id : null;
  const images = await imageService.search(term, limit, offset, viewerId);
  success(res, { images }, "Search results loaded", 200, { page, limit });
});

const nukeBadImages = asyncHandler(async (req, res) => {
  await imageService.nukeBadImages();
  res.json({ success: true, message: "Nuked bad images successfully!" });
});

module.exports = {
  upload,
  feed,
  getImage,
  searchImages,
  deleteImage,
  nukeBadImages
};

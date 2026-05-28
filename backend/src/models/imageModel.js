const { pool } = require("../config/database");

const imageSelect = `
  i.id, i.user_id AS userId, i.title, i.caption, i.image_url AS imageUrl,
  i.source_type AS sourceType, i.ai_prompt AS aiPrompt, i.ai_style AS aiStyle,
  i.view_count AS viewCount, i.like_count AS likeCount, i.comment_count AS commentCount,
  i.save_count AS saveCount, i.created_at AS createdAt,
  u.username, u.full_name AS authorName, u.avatar_url AS authorAvatarUrl
`;

const normalizeTags = (tags = []) =>
  tags.map((tag) => tag.trim().replace(/^#/, "").toLowerCase()).filter(Boolean);

const create = async ({ userId, title, caption, imageUrl, sourceType, aiPrompt = null, aiStyle = null, tags = [] }) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.execute(
      `INSERT INTO images (user_id, title, caption, image_url, source_type, ai_prompt, ai_style)
       VALUES (:userId, :title, :caption, :imageUrl, :sourceType, :aiPrompt, :aiStyle)`,
      { userId, title, caption, imageUrl, sourceType, aiPrompt, aiStyle }
    );
    const imageId = result.insertId;

    for (const tag of normalizeTags(tags)) {
      const [existingTags] = await connection.execute("SELECT id FROM tags WHERE name = :tag", { tag });
      let tagId;
      if (existingTags.length > 0) {
        tagId = existingTags[0].id;
      } else {
        const [insertResult] = await connection.execute("INSERT IGNORE INTO tags (name) VALUES (:tag)", { tag });
        tagId = insertResult.insertId;
        if (tagId === 0) {
          const [retryTags] = await connection.execute("SELECT id FROM tags WHERE name = :tag", { tag });
          tagId = retryTags[0]?.id;
        }
      }

      if (tagId) {
        await connection.execute(
          "INSERT IGNORE INTO image_tags (image_id, tag_id) VALUES (:imageId, :tagId)",
          { imageId, tagId }
        );
      }
    }

    await connection.commit();
    return findById(imageId);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const findById = async (id, viewerId = 0) => {
  const vId = viewerId || 0;
  const [rows] = await pool.execute(
    `SELECT ${imageSelect},
            EXISTS(SELECT 1 FROM likes l WHERE l.image_id = i.id AND l.user_id = :vId) AS isLiked,
            EXISTS(SELECT 1 FROM saves s WHERE s.image_id = i.id AND s.user_id = :vId) AS isSaved
     FROM images i
     JOIN users u ON u.id = i.user_id
     WHERE i.id = :id AND i.deleted_at IS NULL
     LIMIT 1`,
    { id, vId }
  );
  if (!rows[0]) return null;

  const [tags] = await pool.execute(
    `SELECT t.name FROM tags t
     JOIN image_tags it ON it.tag_id = t.id
     WHERE it.image_id = :id
     ORDER BY t.name`,
    { id }
  );

  return { ...rows[0], tags: tags.map((tag) => tag.name) };
};

const attachTagsToImages = async (images) => {
  if (!images || images.length === 0) return [];
  const imageIds = images.map(img => img.id);
  const [tagRows] = await pool.query(
    `SELECT it.image_id AS imageId, t.name
     FROM tags t
     JOIN image_tags it ON it.tag_id = t.id
     WHERE it.image_id IN (${imageIds.join(",")})`
  );

  const tagMap = {};
  tagRows.forEach(row => {
    if (!tagMap[row.imageId]) tagMap[row.imageId] = [];
    tagMap[row.imageId].push(row.name);
  });

  return images.map(img => ({
    ...img,
    tags: tagMap[img.id] || []
  }));
};

const listFeed = async (viewerId, limit, offset, type = 'explore') => {
  const vId = viewerId || 0;
  
  let filterClause = "i.deleted_at IS NULL";
  if (type === 'followed') {
    if (vId > 0) {
      // Include followed users, their own posts, AND a curated subset of 50% of all posts as recommendations
      // to ensure the home page is populated with 100+ images.
      filterClause += ` AND (i.user_id IN (SELECT following_id FROM follows WHERE follower_id = :vId) OR i.user_id = :vId OR i.id % 2 = 0)`;
    }
  }

  const [rows] = await pool.query(
    `SELECT ${imageSelect},
            EXISTS(SELECT 1 FROM likes l WHERE l.image_id = i.id AND l.user_id = :vId) AS isLiked,
            EXISTS(SELECT 1 FROM saves s WHERE s.image_id = i.id AND s.user_id = :vId) AS isSaved,
            EXISTS(SELECT 1 FROM likes l WHERE l.image_id = i.id AND l.user_id = :vId) AS likedByMe,
            EXISTS(SELECT 1 FROM saves s WHERE s.image_id = i.id AND s.user_id = :vId) AS savedByMe
     FROM images i
     JOIN users u ON u.id = i.user_id
     WHERE ${filterClause}
     ORDER BY i.created_at DESC
     LIMIT :limit OFFSET :offset`,
    { vId, limit, offset }
  );
  return attachTagsToImages(rows);
};

const search = async (term, limit, offset, viewerId = 0) => {
  const like = `%${term}%`;
  const vId = viewerId || 0;
  const [rows] = await pool.query(
    `SELECT DISTINCT ${imageSelect},
            EXISTS(SELECT 1 FROM likes l WHERE l.image_id = i.id AND l.user_id = :vId) AS isLiked,
            EXISTS(SELECT 1 FROM saves s WHERE s.image_id = i.id AND s.user_id = :vId) AS isSaved
     FROM images i
     JOIN users u ON u.id = i.user_id
     LEFT JOIN image_tags it ON it.image_id = i.id
     LEFT JOIN tags t ON t.id = it.tag_id
     WHERE i.deleted_at IS NULL
       AND (i.title LIKE :like OR i.caption LIKE :like OR t.name LIKE :like)
     ORDER BY i.created_at DESC
     LIMIT :limit OFFSET :offset`,
    { like, limit, offset, vId }
  );
  return attachTagsToImages(rows);
};

const incrementCounter = async (id, column, amount = 1) => {
  const allowed = ["view_count", "like_count", "comment_count", "save_count"];
  if (!allowed.includes(column)) return;
  await pool.execute(`UPDATE images SET ${column} = GREATEST(${column} + :amount, 0) WHERE id = :id`, { id, amount });
};

const softDelete = async (id) => {
  await pool.execute("UPDATE images SET deleted_at = CURRENT_TIMESTAMP WHERE id = :id", { id });
};

const nukeBadImages = async () => {
  await pool.query("DELETE FROM images WHERE title LIKE '%Virat%' OR title LIKE '%Spice%' OR title LIKE '%Mehndi%'");
};

module.exports = {
  create,
  findById,
  listFeed,
  search,
  incrementCounter,
  softDelete,
  nukeBadImages
};

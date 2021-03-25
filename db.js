const spicedPg = require("spiced-pg");
const db = spicedPg(`postgres:postgres:postgres@localhost:5432/imageboard`);

module.exports.getImages = () => {
    return db.query(`SELECT * FROM images`);
};

module.exports.uploadImages = (url, username, title, description) => {
    const q = `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4)`;
    const params = [url, username, title, description];
    console.log("upload parameters: ", params);
    return db.query(q, params);
};

module.exports.getClickedImageDetails = (id) => {
    return db.query(
        `SELECT url, username, title, description, created_at FROM images WHERE id = $1`,
        [id]
    );
};

module.exports.getComments = (clickedImageId) => {
    return db.query(`SELECT * FROM comments WHERE clickedImageId = $1`, [
        clickedImageId,
    ]);
};

module.exports.submitComment = (comment, username, clickedImageId) => {
    const q = `INSERT INTO comments (comment, username_comment, clickedImageId) VALUES ($1, $2, $3) RETURNING created_at`;
    const params = [comment, username, clickedImageId];
    return db.query(q, params);
};

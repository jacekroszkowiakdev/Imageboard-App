const spicedPg = require("spiced-pg");
const db = spicedPg(`postgres:postgres:postgres@localhost:5432/imageboard`);

module.exports.getImages = (url, username, title, description) => {
    return (
        db.query("SELECT * FROM images"), [url, username, title, description]
    );
};

const express = require("express");
const app = express();
const db = require("./db.js");

app.use(express.static("public"));

app.get("/images", (req, res) => {
    db.getImages()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log(`db.getImages - read form the DB failed: `, err);
        });
});

app.listen(8080, () => console.log("imageboard up and running"));

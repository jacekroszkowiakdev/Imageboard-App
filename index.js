const express = require("express");
const app = express();
const db = require("./db.js");

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.get("/images", (req, res) => {
    // console.log("response: ", res);
    db.getImages()
        .then(({ rows }) => {
            console.log("rows: ", rows);
            res.json(rows);
        })
        .catch((err) => {
            console.log(`db.getImages - read form the DB failed: `, err);
        });
});

// in general it is good practice to serve files with express.static last!
app.use(express.static("public"));

app.listen(8080, () => console.log("imageboard up and running"));

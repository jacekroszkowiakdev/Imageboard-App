DROP TABLE IF EXISTS comments;

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    comment VARCHAR NOT NULL,
    username_comment VARCHAR NOT NULL,
    image_id INTEGER UNIQUE NOT NULL REFERENCES images(id),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
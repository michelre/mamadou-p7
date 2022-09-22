const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbc = require("../config/db");
const db = dbc.getDB();
const path = require("path");
const { getUserIdByToken } = require("../services/tokenUser");

exports.addPost = (req, res) => {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const { user_id } = decodedToken;
    const imageUrl = req.file ?
        `${req.protocol}://${req.get("host")}/images/${req.file.filename}` :
        null;
    //   req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    const content = req.body.content;

    const sql = `INSERT INTO posts (post_user_id,content,post_imageUrl) VALUES("${user_id}","${content}","${imageUrl}");`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
};

exports.getAllPosts = (req, res, next) => {
    const sql =
        "SELECT content, post_imageUrl, post_user_id, post_id, user_firstname, user_lastname, user_picture FROM posts INNER JOIN users ON posts.post_user_id = users.user_id;";
    db.query(sql, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
};

exports.getOnePost = (req, res, next) => {
    const { id: postId } = req.params;
    const sqlGetOnePost = `SELECT date_creation, likes, content, post_id, post_user_id, user_firstname, user_lastname, user_picture FROM posts INNER JOIN users ON posts.post_user_id = users.user_id WHERE post_id = "${postId}";`;
    db.query(sqlGetOnePost, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
};

exports.deleteOnePost = (req, res, next) => {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const { user_id, admin } = decodedToken;
    const { id: post_id } = req.params;

    const sql = `DELETE p FROM posts AS p INNER JOIN users AS u ON (u.user_id = p.post_user_id) WHERE p.post_id = "${post_id}" AND ("${admin}" = 1 OR u.user_id = "${user_id}");`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        console.log(result);
        res.status(200).json(result);
    });
};

exports.likeUnlikePost = (req, res) => {
    const { userId, postId } = req.body;
    const sqlSelect = `SELECT * FROM likes WHERE likes.user_id = "${userId}" AND likes.post_id = "${postId}";`;
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
            res.status(404).json({ err });
            throw err;
        }

        if (result.length === 0) {
            const sqlInsert = `INSERT INTO likes (user_id, post_id) VALUES ("${userId}", "${postId}");`;
            db.query(sqlInsert, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(404).json({ err });
                    throw err;
                }
                res.status(200).json(result);
            });
        } else {
            const sqlDelete = `DELETE FROM likes WHERE likes.user_id = "${userId}" AND likes.post_id = "${postId}";`;
            db.query(sqlDelete, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(404).json(err);
                    throw err;
                }
                res.status(200).json(result);
            });
        }
    });
};

exports.postLikedByUser = (req, res) => {
    const { userId, postId } = req.body;
    const sql = `SELECT post_id, user_id FROM likes WHERE user_id = "${userId}" AND post_id = "${postId}";`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
};

exports.countLikes = (req, res) => {
    // Sert à compter le nombre d'utilisateurs ayant liké ce post
    // Select count = compter le nombre de rows dans une table
    const { postId } = req.body;
    const sqlInsert = `SELECT COUNT(*) AS total FROM likes INNER JOIN users AS u ON (u.user_id = likes.user_id) WHERE likes.post_id = "${postId}";`;
    db.query(sqlInsert, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
};

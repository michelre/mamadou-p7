const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer_config");

router.post("/", auth, upload.single("attachment"), postCtrl.addPost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.delete("/:id", auth, postCtrl.deleteOnePost);

router.patch("/:id/likeunlike", auth, postCtrl.likeUnlikePost);
router.post("/:id/postLikedByUser", auth, postCtrl.postLikedByUser);
router.post("/:id/likeunlike", auth, postCtrl.countLikes);

module.exports = router;

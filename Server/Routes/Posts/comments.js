const express = require("express");
const postRouter = express.Router();
const Post = require("../../Models/RegisteredUsers/posts");

postRouter.post("/comment/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, userName, text } = req.body;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = {
      user: userId,
      userName: userName, 
      text: text,
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
});

module.exports=postRouter;
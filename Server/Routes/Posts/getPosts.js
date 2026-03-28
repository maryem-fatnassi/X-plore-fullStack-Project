const express = require("express");
const postRouter = express.Router();
const Post = require("../../Models/RegisteredUsers/posts");

postRouter.get("/all", async (req, res) => {
  try {
    const posts = await Post.find({status:"published"})
      .populate("user", "userName email") 
      .sort({ createdAt: -1 }); 
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

module.exports=postRouter;


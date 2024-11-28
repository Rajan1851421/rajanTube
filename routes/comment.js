const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Comment = require("../models/Comment.js");
const checkAuth = require("../middieware/checkAuth.js");

Router.post("/new-comment/:videoId", checkAuth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedUser = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("check", verifiedUser);
    const newComment = new Comment({
      videoId: req.params.videoId,
      userId: verifiedUser.id,
      commentText: req.body.commentText,
    });
    const new_comment = await newComment.save();
    res.status(200).json({
      message: "Comment added",
      comment: new_comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// get all comments publically
Router.get("/", async (req, res) => {
  try {
    const publicComment = await Comment.find();
    res.status(200).json({
      message: publicComment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});
// get all comment by id

Router.get("/:videoId", async (req, res) => {
  try {
    const allComments = await Comment.find({
      videoId: req.params.videoId,
    }).populate("userId", "channelName");
    res.status(200).json({
      commentsList: allComments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// edit comment by id
Router.put("/:commentId", checkAuth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedUser = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("comment", verifiedUser);
    const getComment = await Comment.findById(req.params.commentId);
    console.log("All ", getComment);
    if (getComment.userId != verifiedUser.id) {
      res.status(500).json({
        error: "invalid user",
      });
    }
    getComment.commentText = req.body.commentText;
    const updatedComment = await getComment.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
      details: error.message,
    });
  }
});

// delete comment by id
Router.delete("/:commentId", checkAuth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedUser = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("comment", verifiedUser);
    const getComment = await Comment.findById(req.params.commentId);
    console.log("All ", getComment);
    if (getComment.userId != verifiedUser.id) {
      res.status(500).json({
        error: "invalid user",
      });
    }

    const response = await Comment.findByIdAndDelete(req.params.commentId);

    getComment.commentText = req.body.commentText;
    res.status(200).json({
      message: "deleted data successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
      details: error.message,
    });
  }
});

module.exports = Router;

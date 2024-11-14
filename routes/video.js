const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Router = express.Router();
const auth = require("../middieware/checkAuth.js");
const cloudinary = require("cloudinary").v2;
const Video = require("../models/Video.js");
const checkAuth = require("../middieware/checkAuth.js");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SCRET,
});

Router.post("/upload", auth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(user)
    // console.log(req.body)
    // console.log(req.files.video)
    // console.log(req.files.thumbnailUrl)

    const uploadedVideo = await cloudinary.uploader.upload(
      req.files.video.tempFilePath,
      {
        resource_type: "video",
      }
    );
    const uploadedthumbnail = await cloudinary.uploader.upload(
      req.files.thumbnailUrl.tempFilePath
    );
    const newVideo = new Video({
      title: req.body.title,
      discription: req.body.discription,
      user_id: user.id,
      videoUrl: uploadedVideo.secure_url,
      videoId: uploadedVideo.public_id,
      thumbnailUrl: uploadedthumbnail.secure_url,
      thumbnailId: uploadedthumbnail.public_id,
      category: req.body.category,
      tags: req.body.tags.split(","),
    });

    const newUploadedVide0Data = await newVideo.save();
    res.status(200).json({
      newVideo: newUploadedVide0Data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// update video by id

Router.put("/:videoId", checkAuth, async (req, res) => {
  try {
    const veryfiedUser = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    const video = await Video.findById(req.params.videoId);
    // console.log("user:",veryfiedUser)
    // console.log("Video:",video);

    if (video.user_id == veryfiedUser.id) {
      if (req.files) {
        await cloudinary.uploader.destroy(video.thumbnailId);
        const updatedThumbnail = await cloudinary.uploader.upload(
          req.files.thumbnailUrl.tempFilePath
        );
        const updatedData = {
          title: req.body.title,
          discription: req.body.discription,
          category: req.body.category,
          tags: req.body.tags.split(","),
          thumbnailUrl: updatedThumbnail.secure_url,
          thumbnailId: updatedThumbnail.public_id,
        };

        const updatedVideoDetails = await Video.findByIdAndUpdate(
          req.params.videoId,
          updatedData
        );
        res.status(200).json({
          upadted_Video: updatedVideoDetails,
        });
      } else {
        const updatedData = {
          title: req.body.title,
          discription: req.body.discription,
          category: req.body.category,
          tags: req.body.tags.split(","),
        };

        const updatedVideoDetails = await Video.findByIdAndUpdate(
          req.params.videoId,
          updatedData,
          { new: true }
        );
        res.status(200).json({
          upadted_Video: updatedVideoDetails,
        });
      }
    } else {
      return res.status(500).json({
        message: "You are unathorized",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// delete video by id

Router.delete("/:videoId", checkAuth, async (req, res) => {
  try {
    const veryfiedUser = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    console.log(veryfiedUser);
    const video = await Video.findById(req.params.videoId);
    console.log("video:", video);
    if (video && video.user_id.toString() === veryfiedUser.id) {     
      if (video.videoId) {
        await cloudinary.uploader.destroy(video.videoId,{resource_type:'video'});
      }
      if (video.thumbnailId) {
        await cloudinary.uploader.destroy(video.thumbnailId);
      }
      const deletedVideo = await Video.findByIdAndDelete(req.params.videoId);
      res.status(200).json({
        message: "Video deleted successfully",
        data: deletedVideo,
      });
      console.log("Deletion successful");
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "APke aukat ki nahi hai",
    });
  }
});

module.exports = Router;

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


// getAll video for eown 

Router.get('/own-video',checkAuth , async(req,res)=>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(user)
    const videos = await Video.find({user_id:user.id})
    res.status(200).json({
      videos:videos
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error:error
    })
  }
})


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
    // Verify the token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Authorization token is missing" });
    }

    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    console.log("VerifiedUser:", verifiedUser);

    // Find the video by ID
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    console.log("Video:", video);

    // Check if the user is authorized to delete the video
    if (video.user_id == verifiedUser.id) {
      return res.status(403).json({ error: "You are not authorized to delete this video" });
    }

    // Delete the video and its resources
    if (video.videoId) {
      await cloudinary.uploader.destroy(video.videoId, {
        resource_type: "video",
      });
    }
    if (video.thumbnailId) {
      await cloudinary.uploader.destroy(video.thumbnailId);
    }

    const deletedVideo = await Video.findByIdAndDelete(req.params.videoId);
    res.status(200).json({
      message: "Video deleted successfully",
      data: deletedVideo,
    });
  } catch (error) {
    console.error("Error during deletion:", error.message);
    res.status(500).json({
      error: "An error occurred while processing your request",
    });
  }
});


// video like api

Router.put("/like/:videoId", checkAuth, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifiedUser = await jwt.verify(token, process.env.JWT_SECRET);

    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Check if the user has already liked the video
    if (video.likedby.includes(verifiedUser.id)) {
      return res.status(400).json({ error: "Already liked" });
    }

    // Remove dislike if the user had previously disliked the video
    if (video.dislikedby.includes(verifiedUser.id)) {
      video.dislike -= 1;
      video.dislikedby = video.dislikedby.filter(
        (userId) => userId.toString() !== verifiedUser.id
      );
    }

    // Increment likes and add the user to the liked list
    video.likes += 1;
    video.likedby.push(verifiedUser.id);

    await video.save();

    res.status(200).json({
      message: "Video liked successfully",
      likes: video.likes,
      likedby: video.likedby,
    });
    console.log("Like successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// dislike route

Router.put("/dislike/:videoId", checkAuth, async (req, res) => {
  try {
    // Verify the JWT token
    const verifiedUser = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    console.log("Verified User:", verifiedUser);

    // Find the video by ID
    const video = await Video.findById(req.params.videoId);

    // Check if the video exists
    if (!video) {
      return res.status(404).json({
        error: "Video not found",
      });
    }

    // Check if the user has already disliked the video
    if (video.dislikedby.includes(verifiedUser.id)) {
      console.log("Already disliked");
      return res.status(400).json({
        error: "Already disliked",
      });
    }

    // If the user has previously liked the video, remove their like
    if (video.likedby.includes(verifiedUser.id)) {
      video.likes -= 1;
      video.likedby = video.likedby.filter(
        (userId) => userId.toString() !== verifiedUser.id
      );
    }

    // Add user ID to dislikedby array and increment dislikes count
    video.dislikedby.push(verifiedUser.id);
    video.dislike += 1;

    // Save the updated video document
    await video.save();

    res.status(200).json({
      message: "Video disliked successfully",
      dislikes: video.dislike,
      dislikedby: video.dislikedby,
    });
    console.log("Dislike successful");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

//   view video  api
Router.put("/views/:videoId", async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    video.views += 1;
    await video.save();
    res.status(200).json({
      message: "Views added ...",
    });
    console.log("vide", video);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// get all videos

Router.get("/", async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch all videos from the database
    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error("Error fetching videos:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch videos",
      error: error.message,
    });
  }
});

// get video by id

Router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the video ID from the request parameters

    // Find the video by ID in the database
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.error("Error fetching video:", error.message);

    // Handle invalid ID format or server errors
    res.status(500).json({
      success: false,
      message: "Failed to fetch video",
      error: error.message,
    });
  }
});

module.exports = Router;

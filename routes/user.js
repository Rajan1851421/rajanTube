const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middieware/checkAuth.js");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SCRET,
});

Router.get("/", (req, res) => {
  res.status(200).json({
    message: "Workint correctlly",
  });
});
// post user data

Router.post("/signup", async (req, res) => {
  const users = await User.find({ email: req.body.email });
  if (users.length > 0) {
    return res.status(500).json({
      message: "User Already Registerd",
    });
  }
  try {
    const hashCode = await bcrypt.hash(req.body.password, 10);
    const uploadedImage = await cloudinary.uploader.upload(
      req.files.logo.tempFilePath
    );
    // console.log(uploadedImage);

    const newUser = User({
      channelName: req.body.channelName,
      email: req.body.email,
      phone: req.body.phone,
      password: hashCode,
      logoUrl: uploadedImage.secure_url,
      logoId: uploadedImage.public_id,
    });
    // console.log(newUser);
    const user = await newUser.save();
    res.status(200).json({
      newUser: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

//user login

Router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, channelName: user.channelName },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.status(200).json({
      message: "Login successfully",
      user: {
        id: user._id,
        email: user.email,
        channelName: user.channelName,
        logoUrl: user.logoUrl,
        subcribers: user.subcribers,
        subcribedChannels: user.subcribedChannels,
      },
      token: token,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// subscribe chaanel api

Router.put("/subscribe/:userBId", checkAuth, async (req, res) => {
  try {
    const userA = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    // console.log("User A:", userA);
    const userB = await User.findById(req.params.userBId);
    // console.log("user b:", userB);
    if (userB.subcribedBy.includes(userA.id)) {
      return res.status(500).json({
        error: "Already Subscribed",
      });
    }
    userB.subcribers += 1;
    userB.subcribedBy.push(userA.id);
    await userB.save();
    const userAFullinformation = await User.findById(userA.id);
    await userAFullinformation.subcribedChannels.push(userB._id);
    await userAFullinformation.save();
    res.status(200).json({
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
});

// unsubscribe chaanel api
Router.put("/unsubscribe/:userBId", checkAuth, async (req, res) => {
  try {
    // Verify the JWT token and get userA's ID
    const userA = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    console.log("User A:", userA);

    // Find user B by ID (the channel to be unsubscribed from)
    const userB = await User.findById(req.params.userBId);
    if (!userB) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User B:", userB);

    // Check if user A has subscribed to user B
    if (userB.subcribedBy.includes(userA.id)) {
      // Remove user A from user B's subscribedBy array and decrement subscriber count
      userB.subcribers -= 1;
      userB.subcribedBy = userB.subcribedBy.filter(
        (userId) => userId.toString() !== userA.id
      );
      await userB.save();

      // Update user A's subscribedChannels to remove user B's ID
      const userAfullInformation = await User.findById(userA.id);
      userAfullInformation.subcribedChannels = userAfullInformation.subcribedChannels.filter(
        (userId) => userId.toString() !== userB._id.toString()
      );
      await userAfullInformation.save();

      // Respond with success message
      res.status(200).json({
        message: "Unsubscribed successfully",
      });
    } else {
      // User A is not subscribed to user B
      return res.status(400).json({
        error: "You have not subscribed to this user",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});


module.exports = Router;

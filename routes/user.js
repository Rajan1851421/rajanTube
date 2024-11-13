const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SCRET,
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
      return res.status(400).json({ message: "Invalid credentials" });
    }   
    const token = jwt.sign(
      { id: user._id, email: user.email, channelName: user.channelName },
      process.env.JWT_SECRET,
      { expiresIn: "10h" } 
    );    
    res.status(200).json({
      message: "Login successfully",
      user: {
        id: user._id,
        email: user.email,
        channelName: user.channelName,
        logoUrl: user.logoUrl,
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

module.exports = Router;

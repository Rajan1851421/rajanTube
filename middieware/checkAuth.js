const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Inavlid Token",
    });
  }
};

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: false,
    },
    logoId: {
      type: String,
      required: false,
    },
    subcribers: {
      type: Number,
      default: 0,
    },
    subcribedChannels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subcribedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

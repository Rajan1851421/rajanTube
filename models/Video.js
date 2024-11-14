const mongoose = require("mongoose");

const VideSchema = new mongoose.Schema(
  {
    title:{type:String,required:true,},
    discription:{ type:String, required:true},
    user_id:{ type:String, required:true, },
    videoUrl:{type:String, required:true, },
    videoId:{ type:String, required:true  },
    thumbnailUrl:{type:String, required:true, },
    thumbnailId:{type:String, required:true, },
    category:{type:String, required:true, },
    tags:[{type:String }],
    likes:{type:Number, required:true,default:0},
    dislike:{type:Number,default:0},
    likedby:[ {type: mongoose.Schema.Types.ObjectId,ref: "User", },],
    dislikedby:[ {type: mongoose.Schema.Types.ObjectId,ref: "User", },],
    viewby:[ {type: mongoose.Schema.Types.ObjectId,ref: "User", },],
    views:{type:Number,default:0},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", VideSchema);

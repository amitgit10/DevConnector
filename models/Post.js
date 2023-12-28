const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    // profile should have the reference to user
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  text: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      text: { type: String, required: true },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Post = mongoose.model("post", PostSchema);

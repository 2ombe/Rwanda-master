const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "remember the title"],
    },
    body: {
      type: String,
      required: [true, "tell are us what you think"],
    },
    image: {
      type: String,
      required: true,
    },

    comments: {
      type: String,
      max: 100,
    },
    shima: {
      type: String,

      max: 100,
    },
    nenga: {
      type: String,

      max: 100,
    },
    likes: {
      type: Array,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Iganiriro" },
    impamvu: {
      type: String,
      required: true,
      enum: [
        "Guhura numuyobozi",
        "Ikirego",
        "icyangombwa",
        "Ubusobanuro",
        "Izindi mpamvu",
      ],
      default: "Izindi mpamvu",
    },
    description: { type: String, required: true, max: 100 },
    conclusion: { type: String, required: true, max: 50 },
    signature: { type: String },
    feedBackGiven: {
      type: Boolean,
      default: false,
    },
    nanyuzwe: { type: Boolean, default: false },
    whyUtanyuzwe: { type: String, trim: true },

    file: { type: String },
    akarere: {
      type: String,

      min: 3,
      max: 25,
    },
    umurenge: {
      type: String,

      min: 3,
      max: 25,
    },
    akagali: {
      type: String,

      min: 3,
      max: 25,
    },
    umudugudu: {
      type: String,

      min: 3,
      max: 25,
    },
  },
  { timestamps: true }
);

const message = mongoose.model("message", messageSchema);
module.exports = message;

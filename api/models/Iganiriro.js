const mongoose = require("mongoose");

const iganiriroSchema = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    isBuyobazi: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    newMessage: { type: mongoose.Types.ObjectId, ref: "message" },
    Admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    umuyobozi: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Iganiriro = mongoose.model("Iganiriro", iganiriroSchema);
module.exports = Iganiriro;

const mongoose = require("mongoose");

const ukekwaSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    idNumber: {
      type: Number,
    },

    nationality: {
      type: String,
    },

    since: {
      type: Date,
      dafault: Date.now,
    },
    icyaha: {
      type: String,
    },

    umudugudu: {
      type: String,
    },
    akagali: {
      type: String,
    },

    umurenge: {
      type: String,
    },
    akarere: {
      type: String,
    },
    igihugu: { type: String },

    pic: {
      type: String,
      default: "",
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Ukekwa = mongoose.model("Ukekwa", ukekwaSchema);
module.exports = Ukekwa;

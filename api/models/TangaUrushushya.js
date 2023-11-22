const mongoose = require("mongoose");

const subizaSchema = new mongoose.Schema(
  {
    issuer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    impamvu: {
      type: String,
      required: [true, "mutange impamvu"],
    },

    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ingingo: {
      type: String,
      required: [true, "ingingo yitegeko mugendeyeho"],
      min: 3,
      max: 25,
    },

    status: {
      type: String,
      enum: ["Rwatanze", "Mutegereze", "Ntimwemerewe"],
      default: "Mutegereze",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subiza", subizaSchema);

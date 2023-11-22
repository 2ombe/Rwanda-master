const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tableOfContents: {
      type: String,
      default: "",
    },
    executiveSummary: {
      type: String,
      default: "",
    },
    introduction: {
      type: String,
      default: "",
    },
    discussion: {
      type: String,
      default: "",
    },
    conclusion: {
      type: String,
      default: "",
    },
    recommendations: {
      type: String,
      default: "",
    },
    references: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;

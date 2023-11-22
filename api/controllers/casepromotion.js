const express = require("express");
const app = express();
const mongoose = require("mongoose");
const moment = require("moment");

// Connect to MongoDB
mongoose.connect("mongodb://localhost/caseReports", { useNewUrlParser: true });

// Create a MongoDB schema for the case reports
const caseReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Sector", "District", "Province", "Presidency"],
    default: "Sector",
  },
});

// Create a MongoDB model for the case reports
const CaseReport = mongoose.model("CaseReport", caseReportSchema);

// Use body-parser middleware to parse the request body
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// POST endpoint for submitting a case report
app.post("/caseReports", async (req, res) => {
  const { title, description } = req.body;
  const caseReport = new CaseReport({ title, description });
  try {
    await caseReport.save();
    res.status(201).send(caseReport);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Automatically promote case reports to the next level if no feedback is received within 30 days
setInterval(async () => {
  const caseReports = await CaseReport.find({ status: "Sector" });
  caseReports.forEach(async (caseReport) => {
    if (moment().diff(caseReport.createdAt, "days") >= 30) {
      caseReport.status = "District";
      await caseReport.save();
    }
  });
}, 86400000);

setInterval(async () => {
  const caseReports = await CaseReport.find({ status: "District" });
  caseReports.forEach(async (caseReport) => {
    if (moment().diff(caseReport.createdAt, "days") >= 30) {
      caseReport.status = "Province";
      await caseReport.save();
    }
  });
}, 86400000);

setInterval(async () => {
  const caseReports = await CaseReport.find({ status: "Province" });
  caseReports.forEach(async (caseReport) => {
    if (moment().diff(caseReport.createdAt, "days") >= 30) {
      caseReport.status = "Presidency";
      await caseReport.save();
    }
  });
}, 86400000);

// Start the Express server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

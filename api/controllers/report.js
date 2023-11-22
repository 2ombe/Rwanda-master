const { StatusCodes } = require("http-status-codes");

const Report = require("../models/report");
const expressAsyncHandler = require("express-async-handler");

const createReport = async (req, res, next) => {
  const {
    title,
    tableOfContents,
    executiveSummary,
    introduction,
    discussion,
    conclusion,
    recommendations,
    references,
  } = req.body;

  try {
    const author = req.user._id;
    const newReport = await Report.create({
      title,
      tableOfContents,
      executiveSummary,
      introduction,
      discussion,
      conclusion,
      recommendations,
      references,
      author,
      supervisor: "INSERT SUPERVISOR ID HERE", // replace with actual supervisor ID
    });

    res.status(201).json({ report: newReport });
  } catch (error) {
    next(error);
  }
};

// get single report
const getSingleReport = expressAsyncHandler(async (req, res, next) => {
  const reportId = req.params.id;

  try {
    const report = await Report.findById(reportId).populate(
      "supervisor",
      "name, role"
    );
    if (!report) {
      return res.status(400).json({ message: "Raporo ntishoboye kuboneka" });
    }
    res.status(200).json({ report });
  } catch (error) {
    next(error);
  }
});

// get report by the author

const getUsersReport = expressAsyncHandler(async (req, res, next) => {
  try {
    const reports = await Report.find({ author: req.user }).populate(
      "supervisor",
      "name role"
    );
    if (reports.length === 0) {
      return res.status(404).json({ message: "User mage no report" });
    }

    res.status(200).json({ reports });
  } catch (error) {
    next(error);
  }
});

// get report by author

const getReportReceived = expressAsyncHandler(async (req, res, next) => {
  const supervisorId = req.params.supervisorId;
  try {
    const reports = await Report.find({ supervisor: supervisorId });
    if (reports.length === 0) {
      return res.status(400).json({ message: "You have no report" });
    }
    res.status(200).json({ reports });
  } catch (error) {
    next(error);
  }
});

const updateReport = expressAsyncHandler(async (req, res) => {
  const reportId = req.params.reportId;
  const userId = req.user._id;
  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Raporo ntibonetse" });
    }

    if (
      report.author.toString() !== userId ||
      report.supervisor.toString() !== userId
    ) {
      return res
        .status(403)
        .json({ message: "Ntimwemerewe kuvugurura ubu butumwa" });
    }

    // update the report
    report.title = req.body.title || report.title;
    report.content = req.body.content || report.content;
    report.date = req.body.date || report.date;

    const updatedReport = await report.save();
    res
      .status(200)
      .json({ message: "Report updated successfully", report: updatedReport });
  } catch (error) {
    next(error);
  }
});

const deleteReport = async (req, res) => {
  const reportId = req.params.id;

  const report = await Report.findByIdAndRemove({
    _id: reportId,
    createdBy: req.user._id,
  });
  if (!report) {
    throw new NotFoundError(`there is no report with id ${reportId}`);
  }
  res.status(StatusCodes.OK).send("report was deleted");
};

module.exports = {
  createReport,
  updateReport,
  getSingleReport,
  getReportReceived,
  getUsersReport,
  deleteReport,
};

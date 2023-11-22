const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const Case = require("../models/case");

const createCase = expressAsyncHandler(async (req, res) => {
  const { points, chapter, description, article, assignedTo, level, title } =
    req.body;

  const assignedToUser = await User.findById(assignedTo);
  if (!assignedToUser) {
    return res.status(400).json({ message: "Invalid assignedTo user ID" });
  }

  // Create a new case
  const newCase = new Case({
    title: title,
    points: points,
    chapter: chapter,
    level: level,
    article: article,
    description: description,
    createdBy: req.user._id,
    assignedTo: assignedTo,
  });
  console.log(newCase);
  await newCase.save();
  res.json({ newCase });
});

const getUserCases = expressAsyncHandler(async (req, res) => {
  const cases = await Case.find(req.params.id);

  // Return the cases array
  return res.json(cases);
});

// escalate the case

const escalateCase = expressAsyncHandler(async (req, res) => {
  const { caseId } = req.params;

  try {
    const existingCase = await Case.findById(caseId);
    if (!existingCase) {
      return res.status(400).json({ message: "Invalid case" });
    }

    // check escalated case
    if (existingCase.status === "escalated") {
      return res.status(400).json({ message: "Case already escalated" });
    }
    // calculate the current date and escalation date
    const currentDate = new Date();
    const escalationDate = new Date(currentDate.getTime() + 5 * 60 * 1000);

    // update the case status and escalation date
    existingCase.status = "escalated";
    existingCase.lastUpdatedOn = currentDate;
    existingCase.escalationDate = escalationDate;
    existingCase.title = existingCase.title;
    existingCase.description = existingCase.description;
    existingCase.chapter = existingCase.chapter;
    existingCase.article = existingCase.article;

    // find the next user to assign the case to
    const nextLevel = getNextLevel(existingCase.assignedTo.role); // Get the next level based on the assigned user's role
    const nextLevelUser = await User.findOne({ role: nextLevel });

    // If there is no next level user, escalate the case to the president
    if (!nextLevelUser) {
      const presidentUser = await User.findOne({ role: "president" });

      existingCase.assignedTo = presidentUser._id;
    } else {
      existingCase.assignedTo = nextLevelUser._id;
    }

    // save the updated case to the database
    await existingCase.save();
    // return the existing case
    return res.json(existingCase);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Helper function to get the next leve

function getNextLevel(currentLevel) {
  switch (currentLevel) {
    case "Umuturage":
      return "Mutwarasibo";
    case "Mutwarasibo":
      return "Mutekano";
    case "Mutekano":
      return "Mujyanama";
    case "Mujyanama":
      return "Umwunzi";
    case "Umwunzi":
      return "Mudugudu";
    case "Mudugudu":
      return "Gitifu-kagali";
    case "Gitifu-kagali":
      return "Murenge";
    case "Murenge":
      return "Mayor";
    case "Mayor":
      return "Vice-mayor";
    case "Vice-mayor":
      return "village";
    case "village":
      return "cell";
    case "cell":
      return "sector";
    case "sector":
      return "district";
    case "district":
      return "province";
    case "province":
      return "ministry";
    case "ministry":
      return "president";
    default:
      return null;
  }
}

// controller function to get all cases for a user
async function getCasesForUser(req, res) {
  try {
    const userId = req.user._id;
    const cases = await Case.find({
      $or: [{ creator: userId }, { receiver: userId }],
    }).sort({ createdAt: "desc" });
    res.json(cases);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

// Get cases by level
async function getCasesByLevel(req, res) {
  const { level } = req.params;
  try {
    const cases = await Case.find({ level: level });
    res.json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

// Update a case
async function updateCase(req, res) {
  const { id } = req.params;
  const { status, comments } = req.body;
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      id,
      { status, comments },
      { new: true }
    );
    res.json(updatedCase);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

// Get cases for a user
async function getCasesForUser(req, res) {
  const { createdBy } = req.params;
  try {
    const cases = await Case.find(createdBy).populate(
      "assignedTo",
      "name role"
    );
    console.log(cases);
    res.json(cases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
}

// controller function to update a case
async function updateCase(req, res) {
  try {
    const caseId = req.params.caseId;
    const currentCase = await Case.findById(caseId);
    if (!currentCase) {
      return res.status(400).json({ msg: "Case not found" });
    }
    if (currentCase.status !== "pending") {
      return res
        .status(400)
        .json({ msg: "cannot update case which is pending" });
    }
    const response = req.body.response;
    const level = getNextLevel(currentCase.Level);
    const updateFields = {
      status: "complited",
      response,
      updatedAt: new Date(),
    };
    if (level) {
      (updateFields.level = level),
        (updateFields.receiver = req.body.nextReceiver);
    }
    const updatedCase = await Case.findByIdAndUpdate(caseId, updateFields, {
      new: true,
    });
    res.json(updatedCase);
  } catch (error) {
    res.status(500).send("sever error");
  }
}
// get single case
const getSingleCase = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const singleCase = await Case.findById(id)
      .populate("assignedTo", "name")
      .populate("createdBy", "name");

    if (!singleCase) {
      return res.status(404).json({ error: "case not found" });
    }

    res.status(200).json(singleCase);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getCase = expressAsyncHandler(async (req, res) => {
  const cases = await Case.find({});

  res.send(cases);
});

module.exports = {
  createCase,
  getCasesForUser,
  updateCase,
  escalateCase,
  getCasesByLevel,
  getUserCases,
  getSingleCase,
  getCase,
};

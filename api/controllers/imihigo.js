const expressAsyncHandler = require("express-async-handler");
const Goal = require("../models/imihigo");

const createGoal = expressAsyncHandler(async (req, res) => {
  try {
    const { name, description, timeline, evaluators, beneficiaries } = req.body;
    const createdBy = req.user._id;
    const goal = await Goal.create({
      name,
      description,
      timeline,
      createdBy,
      evaluators,
      beneficiaries,
    });

    res.status(201).json({ data: goal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

const getGoal = expressAsyncHandler(async (req, res) => {
  try {
    const goalId = req.params.id;
    const goal = await Goal.findById(goalId)
      .populate("createdBy", "name")
      .populate("evaluators", "name")
      .populate("beneficiaries", "name");

    if (!goal) {
      return res.status(404).json({ success: false, error: "Goal not found" });
    }

    if (goal.timeline < new Date()) {
      return res
        .status(400)
        .json({ success: false, error: "Goal timeline has expired" });
    }

    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

const updateGoal = expressAsyncHandler(async (req, res) => {
  try {
    const goalId = req.params.id;
    const { name, description, timeline, evaluators, beneficiaries } = req.body;

    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ success: false, error: "Goal not found" });
    }

    if (goal.timeline < new Date()) {
      const beneficiaryNames = beneficiaries.map((b) => b.name).join(", ");
      const message = `The deadline for goal "${goal.name}" has been reached. the beneficiaries (${beneficiaryNames}) should provide perfomance reports.`;

      // send message using your preffered preffered notification

      return res
        .status(400)
        .json({ success: false, error: "Goal timeline has expired" });
    }

    goal.name = name || goal.name;
    goal.description = description || goal.description;
    goal.timeline = timeline || goal.timeline;
    goal.evaluators = evaluators || goal.evaluators;
    goal.beneficiaries = beneficiaries || goal.beneficiaries;

    await goal.save();
    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
const getAllGoal = expressAsyncHandler(async (req, res) => {
  const goals = await Goal.find({});
  res.status(201).send(goals);
});

module.exports = { getGoal, createGoal, updateGoal, getAllGoal };

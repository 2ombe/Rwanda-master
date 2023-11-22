const expressAsyncHandler = require("express-async-handler");
const Market = require("../models/amasoko");
const { calculatePerformanceLevel } = require("../utils");

const createMarket = expressAsyncHandler((req, res) => {
  const {
    name,
    location,
    activities,
    budget,
    steps,
    timeline,
    totalCost,
    entrepreneurName,
  } = req.body;

  const market = new Market({
    name,
    location,
    activities,
    budget,
    steps,
    timeline,
    totalCost,
    amountUsed: 0,
    remainingAmount: budget,
    performanceLevel: "N/A",
    entrepreneurName,
  });

  market
    .save()
    .then(() => {
      res.json({ success: true, message: "Market created successfully" });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Failed to create market",
        error: err,
      });
    });
});
const updateMarket = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amountUsed, performanceLevel } = req.body;

  try {
    const market = await Market.findById(id);
    if (!market) {
      res.status(404).json({ success: false, message: "Market not found" });
      return;
    }

    const { budget, steps, timeline, totalCost, activities } = market;

    // Check if amount used exceeds budget for any step
    const stepBudgets = steps.split(",").map((step) => {
      const [name, budgetStr] = step.split(":");
      const budget = parseInt(budgetStr.trim());
      return { name, budget };
    });

    const usedBudgets = amountUsed
      .split(",")
      .map((amount) => parseInt(amount.trim()));

    const invalidBudgets = stepBudgets.filter(
      (step, index) => usedBudgets[index] > step.budget
    );

    if (invalidBudgets.length > 0) {
      const invalidStepNames = invalidBudgets
        .map((step) => step.name)
        .join(", ");
      res.status(400).json({
        success: false,
        message: `Budget used incorrectly for steps: ${invalidStepNames}`,
      });
      return;
    }

    // Check if all steps are completed before timeline is reached
    const completedBudget = usedBudgets.reduce(
      (sum, amount) => sum + amount,
      0
    );
    const remainingBudget = budget - completedBudget;

    const stepTimelines = steps.split(",").map((step) => {
      const [name, budgetStr, timelineStr] = step.split(":");
      const timeline = parseInt(timelineStr.trim());
      return { name, timeline };
    });

    const remainingTimelines = stepTimelines.filter((step) => {
      const stepBudget = stepBudgets.find(
        (budget) => budget.name === step.name
      );
      const stepUsedBudget = usedBudgets.find(
        (amount, index) => index === stepBudgets.indexOf(stepBudget)
      );
      const stepRemainingBudget = stepBudget.budget - stepUsedBudget;
      return stepRemainingBudget > 0 && timeline < step.timeline;
    });

    if (remainingTimelines.length > 0) {
      const remainingStepNames = remainingTimelines
        .map((step) => step.name)
        .join(", ");
      res.json({
        success: true,
        message: `Market updated: steps ${remainingStepNames} remaining before deadline`,
      });
      return;
    }

    // Check if market cost is greater than 50% of any existing markets with the same activities
    const existingMarkets = await Market.find({ activities });

    for (let i = 0; i < existingMarkets.length; i++) {
      const existingMarket = existingMarkets[i];
      if (existingMarket._id.equals(market._id)) {
        continue;
      }
      const existingCost = existingMarket.totalCost;
      const existingActivities = existingMarket.activities;
      const matchingActivities = existingActivities.filter((activity) =>
        activities.includes(activity)
      );
      const matchingCostPercentage =
        (matchingActivities.length / activities.length) * 100;
      if (matchingCostPercentage >= 50 && totalCost > existingCost) {
        res.status(400).json({
          success: false,
          message: `Market cannot be created: Cost exceeds 50% of existing markets with similar activities`,
        });
        return;
      }
    }

    // Update market with amount used and performance level
    const newAmountUsed = usedBudgets.join(", ");
    const newPerformanceLevel =
      performanceLevel || calculatePerformanceLevel(completedBudget, budget);

    market.amountUsed = newAmountUsed;
    market.performanceLevel = newPerformanceLevel;

    await market.save();

    res.status(200).json({ message: "Market updated successfully", market });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const getMarket = expressAsyncHandler(async (req, res) => {
  try {
    const markets = await Market.find({});
    const marketData = markets.map((market) => {
      const {
        _id,
        name,
        location,
        activities,
        budget,
        steps,
        timeline,
        amountUsed,
        remainingAmount,
        completedBudget,
        performanceLevel,
        entrepreneurs,
      } = market;
      const progress = completedBudget / budget;
      let status = "";
      let statusColor = "";
      if (timeline <= new Date() && progress < 1) {
        status = "Failing";
        statusColor = "danger";
      } else if (progress >= 1) {
        status = "Completed";
        statusColor = "success";
      } else if (
        amountUsed.some((amount, index) => amount > steps[index].budget)
      ) {
        status = "Incorrect Budget usage";
        statusColor = "warning";
      } else if (
        markets.some(
          (otherMarket) =>
            otherMarket.activities === activities && otherMarket.budget * 1.5
        )
      ) {
        status = "Stop Market";
        statusColor = "danger";
      } else {
        status = "Ongoing";
        statusColor = "primary";
      }
      return {
        id: _id,
        name,
        location,
        activities,
        budget,
        steps,
        timeline,
        amountUsed,
        remainingAmount,
        completedBudget,
        performanceLevel,
        entrepreneurs,
        status,
        statusColor,
      };
    });
    res.status(200).json(marketData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { createMarket, updateMarket, getMarket };

const schedule = require("node-schedule");
const { escalateCase } = require("./controllers/case");

function escalateSchedure() {
  const job = schedule.scheduleJob("/5****", function () {
    escalateCase();
  });
}

function calculatePerformanceLevel(completedBudget, budget) {
  const progress = completedBudget / budget;
  if (progress >= 0.9) {
    return "Excellent";
  } else if (progress >= 0.7) {
    return "Good";
  } else if (progress >= 0.5) {
    return "Fair";
  } else {
    return "Poor";
  }
}

module.exports = { escalateSchedure, calculatePerformanceLevel };

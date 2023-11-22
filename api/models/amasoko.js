const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  activities: { type: String, required: true },
  budget: { type: Number, required: true },
  steps: { type: String, required: true },
  timeline: { type: String, required: true },
  totalCost: { type: Number, required: true },
  amountUsed: { type: Number, required: true },
  remainingAmount: { type: Number, required: true },
  performanceLevel: { type: String, required: true },
  entrepreneurName: { type: String, required: true },
});

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;

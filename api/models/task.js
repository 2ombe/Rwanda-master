const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    // assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // reference to another User model
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    deadline: { type: Date, required: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;

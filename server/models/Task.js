import mongoose from "mongoose";

/**
 * user is custom - view ./User.js
 */

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: { type: String, required: true },

  creationDate: { type: Date, default: Date.now },

  // make sure this is optional in controller
  dueDate: { type: Date },

  status: {
    type: String,
    enum: ["pending", "completed", "overdue"],
    default: "pending",
  },

  category: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },

  // make sure this is optional in controller
  completedDate: { type: Date },

  // mapping from category to points will be in controller
  points: { type: Number, default: 0 },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;

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
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ["pending", "completed", "overdue"],
    default: "pending",
  },
  notes: { type: String },
  category: {
    type: String,
    enum: ["easy", "medium", "hard", "very hard"],
    required: true,
  },
  tags: [String],
  completedDate: { type: Date }, // optional: date when the task was completed
  points: { type: Number, default: 0 }, // points gained or lost for this task
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;

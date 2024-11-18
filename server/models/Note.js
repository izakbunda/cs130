import mongoose from "mongoose";
import Task from "../models/Task.js";
import Folder from "../models/Folder.js";

/**
 * task is custom – view ./Task.js
 */

const NoteSchema = new mongoose.Schema({
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    required: true,
  },
  name: { type: String, required: true },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});


// pre-delete hook - triggers before deleteOne on Note docs
NoteSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    // get all associated task ids
    const tasks = await this.tasks;

    // loop over tasks + delete each one
    if (tasks && tasks.length > 0) {
      for (const taskId of tasks) {
        const task = await Task.findById(taskId);
        await task.deleteOne(); // should trigger task pre-delete hook
      }
    }

    // remove note ref from folder's notes arr
    const folder = await Folder.findByIdAndUpdate(this.folder, { $pull: { notes: this._id } });

    next();
  } catch (error) {
    next(error);
  }
});

const Note = mongoose.model("Note", NoteSchema);

export default Note;
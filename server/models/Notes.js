import mongoose from "mongoose";

/**
 * task is custom – view ./Task.js
 */

const NotesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;

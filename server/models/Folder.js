import mongoose from "mongoose";

/**
 * notes is custom – view ./Notes.js
 */

const FolderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes",
    },
  ],
});

const Folder = mongoose.model("Folder", FolderSchema);

export default Folder;

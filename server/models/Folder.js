import mongoose from "mongoose";
import User from "../models/User.js"
import Note from "../models/Note.js";

/**
 * notes is custom – view ./Notes.js
 */

const FolderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

// pre-delete hook - triggers before deleteOne on Note docs
FolderSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    console.log("doing pre delete stuff...");
    // get all associated note ids
    const notes = await this.notes;
    console.log(notes);

    // loop over notes + delete each one
    if (notes && notes.length > 0) {
      for (const noteId of notes) {
        const note = Note.findById(noteId);
        await note.deleteOne(); // should trigger note pre-delete hook
      }
    }

    // remove folder ref from user's notes arr
    const user = await User.findByIdAndUpdate(this.user, { $pull: { folders: this._id } });
    console.log("new folders arr: ", user.folders);

    next();
  } catch (error) {
    next(error);
  }
});

const Folder = mongoose.model("Folder", FolderSchema);

export default Folder;

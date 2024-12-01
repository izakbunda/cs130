import mongoose from 'mongoose'
import Note from '../models/Note.js'

/**
 * user is custom - view ./User.js
 */

const TaskSchema = new mongoose.Schema({
  note: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note',
    required: true
  },

  name: { type: String, required: true },

  creationDate: { type: Date, default: Date.now },

  // make sure this is optional in controller
  dueDate: { type: Date },

  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },

  category: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },

  // make sure this is optional in controller
  completedDate: { type: Date },

  // mapping from category to points will be in controller
  points: { type: Number, default: 10 }
})

// pre-delete hook - removes task ref from note's tasks arr
TaskSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    // remove task from note arr
    const note = await Note.findByIdAndUpdate(
      this.note,
      { $pull: { tasks: this._id } },
      { new: true }
    )

    next()
  } catch (error) {
    next(error)
  }
})

const Task = mongoose.model('Task', TaskSchema)

export default Task

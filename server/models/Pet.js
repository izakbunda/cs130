import mongoose from "mongoose";

/**
 * user is custom – view ./User.js
 */

const PetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  type: { type: String, required: true },

  points: { type: Number, default: 0 }, // current xp
  level: { type: Number, default: 0 }, // pet's current level based on points
});

const Pet = mongoose.model("Pet", PetSchema);

export default Pet;

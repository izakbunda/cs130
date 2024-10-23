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
  status: {
    type: String,
    enum: ["alive", "dead"],
    default: "alive",
  },
  points: { type: Number, default: 0 }, // current points
  birthDate: { type: Date, default: Date.now },
  deathDate: { type: Date }, // opional: only set if the pet dies
  level: { type: Number, default: 1 }, // pet's current level based on points
  evolutionStage: {
    type: String,
    enum: ["baby", "child", "teen", "adult"],
    default: "baby",
  },
});

const Pet = mongoose.model("Pet", PetSchema);

export default Pet;

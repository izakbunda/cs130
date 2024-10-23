import mongoose from "mongoose";

/**
 * task is custom – view ./Task.js
 * pet in pets is custom  – view ./Pets.js
 */

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    createdAt: { type: Date, default: Date.now },

    // idk if we want this?
    profile: {
      username: { type: String, unique: true },
      picturePath: {
        type: String,
        default: "", // change to something else later
      },
    },

    currentPet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
  },
  { timestamps: true }
);

/**
 * NOTE: why do we need this:
 * when we create a mongoose model, we create a schema first, then pass it into the model
 */

const User = mongoose.model("User", UserSchema);

export default User;

import mongoose from "mongoose";

/**
 * folders is custom – view ./Folder.js
 * pet in pets is custom  – view ./Pets.js
 */

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    folders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
      },
    ],

    pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

/**
 * NOTE: why do we need this:
 * when we create a mongoose model, we create a schema first, then pass it into the model
 */

const User = mongoose.model("User", UserSchema);

export default User;

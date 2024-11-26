import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */

// send the new user back if everything goes well
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(); // used to encrypt password
    console.log("Generated salt:", salt);
    console.log(email);
    console.log("Password", password);

    const passwordHash = await bcrypt.hash(password, salt);
    console.log("Password hash:", passwordHash);

    const newUser = new User({
      // set values from req body
      email,
      password: passwordHash,

      // default values:
      folders: [], // array -> empty
      pets: [], // array -> empty
      createdAt: Date.now(),
    });

    console.log("New user to be saved:", newUser);

    const savedUser = await newUser.save();

    // send the new user back with status 201 (Created)

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: savedUser });
  } catch (error) {
    // send error 500 (Internal Server)
    res.status(500).json({ error: error.message });
  }
};

/* LOGGIN IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // we are using mongoose to try to find the user with this specified user
    const user = await User.findOne({ email: email });

    // correct email
    if (!user) {
      return res.status(400).json({ msg: "User does not exist. " });
    }

    // correct password
    const isMatch = await bcrypt.compare(password, user.password); // will use the same salt
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials. " });
    }

    // JWT token setup
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password; // delete so it doesnt get sent to the frontend

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

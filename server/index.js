import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path"; // built into node
import dotenv from "dotenv";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";

// import { verifyToken } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url); // so we can grab the file url
const __dirname = path.dirname(__filename);
dotenv.config(); // this allows us to do process.env

const app = express();
app.use(express.json()); // allows us to JSON payloads in request bodies

/* security */

// cors - https://www.npmjs.com/package/helmet
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // need this to avoid cors error
app.use(cors());

/* debugging help */

// for reading http errors - https://expressjs.com/en/resources/middleware/morgan.html
app.use(morgan("common")); // 'common' outputs method, URL, status, and response time of request

/* Debugging Middleware */
app.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);
  next();
});

/* requests */
// will parse incoming request bodies as JSON
app.use(bodyParser.json({ extended: true })); // extended: true  will allow us to parse nested objects
// will parse incoming bodies from URL
app.use(bodyParser.urlencoded({ extended: true })); // extended: true  will allows us to parse nested objects

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/login", authRoutes);

const PORT = process.env.PORT || 6001;
// app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

console.log("Connecting to MongoDB with URL:", process.env.MONGO_URL);
mongoose

  .connect(process.env.MONGO_URL, {
    // useNewURLParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD THIS ONE TIME */
    // manually inject this information
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

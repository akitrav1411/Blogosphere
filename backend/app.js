import express from "express";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import { statusMessages } from "./config/index.js";
import cors from "cors";
import { loadRoutes, logger } from "./utils/index.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

//connection with db
connectDB()
  .then(() => {
    console.log(statusMessages.MONGO_CONNECTED);
    app.use(express.json());
    const corsOptions = {
      origin: "*",
      credentials: true,
      optionSuccessStatus: 200,
    };

    app.use(cors(corsOptions));
    app.use(logger);
    loadRoutes(app);

    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err, statusMessages.MONGO_NOT_CONNECTED);
  });

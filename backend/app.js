import express from "express";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import { statusMessages } from "./config/index.js";
import cors from "cors";
import { loadRoutes, logger } from "./utils/index.js";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import "./utils/oauth.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

//connection with db
connectDB()
  .then(() => {
    console.log(statusMessages.MONGO_CONNECTED);
    app.use(express.json({ limit: "50mb" }));
    const corsOptions = {
      origin: "*",
      credentials: true,
      optionSuccessStatus: 200,
    };
    app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
    app.use(bodyParser.json({ limit: "50mb" }));
    // const storage = multer.memoryStorage();
    // const upload = multer({ storage: storage });
    app.use(cors(corsOptions));
    app.use(logger);

    app.use(
      session({
        secret: "mysecret",
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.get(
      "/auth/google",
      passport.authenticate("google", { scope: ["profile", "email"] })
    );

    app.get(
      "/auth/google/callback",
      passport.authenticate("google", {
        failureRedirect: "/login",
        // successRedirect: "/profile",
      }),
      function (req, res) {
        // Successful authentication, redirect home.
        console.log("request", req);
      }
    );
    app.get("/profile", (req, res) => {
      console.log("res", req.user);
      res.send(`Welcome`);
    });
    loadRoutes(app);
    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err, statusMessages.MONGO_NOT_CONNECTED);
  });

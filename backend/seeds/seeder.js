import tags from "./tags.js";
import { Blog, Tag, User } from "../models/index.js";
import { connectDB } from "../db/index.js";
import { statusMessages } from "../config/index.js";
import mongoose from "mongoose";
import crypto from "crypto-js";
import dotenv from "dotenv";
import { blogs } from "./blogs.js";
dotenv.config();
const seeder = async () => {
  try {
    await Tag.deleteMany({});
    await Tag.insertMany(tags.map((tag) => ({ tag })));
  } catch (err) {
    console.log("error in tags", err);
  }
  try {
    await Blog.deleteMany({});
    await Blog.insertMany(blogs.map((blog) => ({ ...blog })));
  } catch (err) {
    console.log("error in blogs", err);
  }
  try {
    const hash = await crypto.AES.encrypt("vartika", process.env.SECRET_KEY);
    const admin = new User({
      firstname: "rakshit",
      lastname: "agr",
      username: "raks",
      email: "rakshit@gmail.com",
      password: hash,
      dob: new Date("11-14-2000"),
    });
    await admin.save();
  } catch (err) {
    console.log("error in user", err);
  }
};
connectDB()
  .then(() => {
    console.log(statusMessages.MONGO_CONNECTED);
    seeder()
      .then(() => {
        console.log(statusMessages.SEEDER_RUN_SUCCESS);
      })
      .catch((err) => {
        console.log(err, statusMessages.SEEDER_RUN_FAILURE);
      })
      .finally(() => {
        console.log(statusMessages.MONGO_CONNECTION_CLOSE);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.log(statusMessages.MONGO_NOT_CONNECTED, err);
  });

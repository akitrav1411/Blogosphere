import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.DB_URL;
export const connectDB = () => {
  return mongoose.connect(url, {
    autoIndex: true,
  });
};

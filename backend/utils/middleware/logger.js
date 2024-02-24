import dotenv from "dotenv";
dotenv.config();
export const logger = (req, res, next) => {
  res.on("finish", () => {
    console.log(
      `${process.env.PROJECT_NAME} | ${req.method} | ${req.originalUrl} | ${res.statusCode}`
    );
  });
  next();
};

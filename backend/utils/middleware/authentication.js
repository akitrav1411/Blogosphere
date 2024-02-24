import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const initialiseToken = (payload) => {
  const token = jwt.sign(payload.toJSON(), process.env.SECRET_KEY);
  return token;
};

export const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(422).send("You must be logged in");
  } else {
    jwt.verify(authorization, process.env.SECRET_KEY, async (err, payload) => {
      req.user = payload;
      if (err) return res.status(422).send("Not authorised");
      next();
    });
  }
};

import { Blog, User } from "../models/index.js";
import crypto from "crypto-js";
import dotenv from "dotenv";
import { statusMessages, statusCodes } from "../config/index.js";
import { initialiseToken } from "../utils/index.js";
import { ObjectId } from "mongodb";
dotenv.config();
const TitleCase = (s) => {
  return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
};
const signup = async (req) => {
  try {
    const { firstname, lastname, username, dob, email, password } = req.body;
    const hashPassword = crypto.AES.encrypt(password, process.env.SECRET_KEY);
    const newUser = new User({
      firstname,
      lastname,
      username,
      dob,
      email,
      password: hashPassword,
    });
    await newUser.save();
    const token = initialiseToken(newUser);
    return { ...newUser.toJSON(), token };
  } catch (err) {
    console.log(err, "error");
    const { name } = err;
    switch (name) {
      case "MongoServerError":
        const { code, keyValue } = err;
        let dupe = Object.keys(keyValue)[0];
        dupe = TitleCase(dupe);
        switch (code) {
          case 11000:
            throw {
              status: statusCodes.CONFLICT,
              message: `${dupe} is already taken`,
            };
        }
        break;
      case "ValidationError":
        const { message } = err;
        const resToSend = message.split(":").slice(-1)[0].trim();
        throw { status: statusCodes.NOT_ACCEPTABLE, message: resToSend };
    }
  }
};
const login = async (req) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw {
        status: statusCodes.NOT_ACCEPTABLE,
        message: statusMessages.ALL_FIELDS_REQUIRED,
      };
    }
    const savedUser = await User.findOne({ email });
    if (savedUser) {
      const bytes = crypto.AES.decrypt(
        savedUser.password,
        process.env.SECRET_KEY
      );
      const unhashpassword = bytes.toString(crypto.enc.Utf8);
      if (unhashpassword === password) {
        const token = initialiseToken(savedUser);
        return { ...savedUser.toJSON(), token };
      } else
        throw {
          status: statusCodes.CONFLICT,
          message: statusMessages.USER_INVALID_CREDENTIALS,
        };
    } else {
      throw {
        status: statusCodes.BAD_REQUEST,
        message: statusMessages.USER_INVALID_CREDENTIALS,
      };
    }
  } catch (err) {
    console.log(err, statusMessages.USER_LOGIN_FAILURE);
    throw err;
  }
};
const getUserData = async (req) => {
  try {
    const { userId } = req.params;
    const userDetail = await User.findById({ _id: userId });

    const userBlogs = await Blog.aggregate([
      {
        $match: {
          createdBy: new ObjectId(userId),
          isPublished: true,
        },
      },
      {
        $addFields: {
          likes: { $size: "$likedBy" },
          title: {
            $cond: {
              if: { $gt: [{ strLenCP: "$title" }, 10] },
              then: {
                $concat: [{ $substrCP: ["$title", 0, 10] }, "..."],
              },
              else: "$title",
            },
          },
        },
      },
      {
        $sort: {
          likes: -1,
        },
      },
      {
        $limit: 4,
      },
      {
        $project: {
          likes: 1,
          title: 1,
          tags: 1,
        },
      },
    ]);

    return {
      userDetail: { ...userDetail.toJSON() },
      userBlogs,
    };
  } catch (error) {
    console.log(error, statusMessages.USER_DETAIL_FAILURE);
    throw error;
  }
};
export { signup, login, getUserData };

import mongoose from "mongoose";
const { Schema } = mongoose;
const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "firstname is required"],
    validate: [
      {
        validator: (value) => value.length < 15,
        message: "firstname can't be of more than 15 characters",
      },
    ],
  },
  lastname: {
    type: String,
    required: [true, "lastname is required"],
    validate: [
      {
        validator: (value) => value.length < 15,
        message: "lastname can't be of more than 15 characters",
      },
    ],
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    validate: [
      {
        validator: (value) => value.length < 15,
        message: "username can't be of more than 15 characters",
      },
    ],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    trim: true,
    validate: [
      {
        validator: (value) => {
          const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return email.test(value);
        },
        message: "Invalid Email",
      },
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  // gender: {
  //   type: String,
  //   enum: {
  //     values: ["male", "female", "others"],
  //     message: "{VALUE} is not supported",
  //   },
  // },
  dob: {
    type: Date,
    validate: [
      {
        validator: (value) => {
          const year = new Date(value).getFullYear();
          const current_year = new Date().getFullYear();
          return year + 12 <= current_year;
        },
        message: "Age must be more than 12 years",
      },
    ],
  },
});
export const User = mongoose.model("Users", UserSchema);

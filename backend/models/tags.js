import mongoose from "mongoose";
const { Schema } = mongoose;

const TagSchema = new Schema({
  tag: {
    type: String,
    required: [true, "tag is required"],
    unique: true,
    validate: [
      {
        validator: (value) => {
          return value.length < 25;
        },
        message: "{VALUE} should be atmost of 25 characters",
      },
    ],
  },
});

export const Tag = mongoose.model("Tags", TagSchema);

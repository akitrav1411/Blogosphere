import mongoose from "mongoose";
const { Schema } = mongoose;

const blogsSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    validate: [
      {
        validator: (value) => value.length <= 100,
        message: "Title exceeds 100 characters",
      },
    ],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  createdAt: Date,
  content: {
    type: String,
    required: [true, "Content is required"],
    validate: [
      {
        validator: (value) => value.length <= 2000,
        message: "Content exceeds 2000 characters",
      },
    ],
  },
  likedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  isPublished: {
    type: Boolean,
    required: [true, "Publish status is required"],
  },
  isDeleted: {
    type: Boolean,
    required: [true, "Delete status is required"],
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tags",
    },
  ],
  image: String,
});

blogsSchema.path("likedBy").validate(function (value) {
  const uniqueIds = new Set(value.map((id) => id.toString()));
  return uniqueIds.size === value.length;
}, "LikedBy array must contain unique elements");

export const Blog = mongoose.model("blogs", blogsSchema);

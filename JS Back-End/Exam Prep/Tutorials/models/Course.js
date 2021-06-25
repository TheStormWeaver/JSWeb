const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    required: [true, "A name for the course is required!"],
    minLength: [4, "The title of the course should be at least 4 symbols!"],
  },
  description: {
    type: String,
    required: [true, "Description for the course is required!"],
    minLength: [20, "Description must be at least 20 characters long!"],
  },
  imageUrl: {
    type: String,
    required: [true, "An image with a valid URL is required!"],
    match: [/^https?/, "Image must be a valid URL"],
  },
  duration: { type: String },
  createdAt: { type: Date, default: Date.now },
  usersInCourses: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Play", schema);

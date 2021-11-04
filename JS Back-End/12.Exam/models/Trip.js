const { Schema, model } = require("mongoose");

const schema = new Schema({
  startPoint: {
    type: String,
    required: [true, "A starting point for the trip is required!"],
    minLength: [4, "The startPoint must be at least 4 characters long!"],
  },
  endPoint: {
    type: String,
    required: [true, "A end point for the trip is required!"],
    minLength: [4, "The endPoint must be at least 4 characters long!"],
  },
  date: {
    type: String,
    required: [true, "A date for the trip is required!"],
  },
  time: {
    type: String,
    required: [true, "A time for the trip is required!"],
  },
  imageUrl: {
    type: String,
    required: [true, "An image with a valid URL is required!"],
    match: [/^https?/, "Image must be a valid URL"],
  },
  brand: {
    type: String,
    required: [true, "A brand for the car is required!"],
    minLength: [4, "The brand must be at least 4 characters long!"],
  },
  seats: {
    type: Number,
    required: [true, "A number of free seats in the car must be shown!"],
    min: [0, "The seats must be at least 0!"],
    max: [4, "The seats can't be over 4!"],
  },
  price: {
    type: Number,
    required: [true, "A price must be set!"],
    min: [1, "Minimum price is 1!"],
    max: [50, "Maximum price is 50!"],
  },
  description: {
    type: String,
    required: [true, "Description for the trip is required!"],
    minLength: [10, "Description must be at least 10 characters long!"],
  },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  buddies: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
});

module.exports = model("Trip", schema);

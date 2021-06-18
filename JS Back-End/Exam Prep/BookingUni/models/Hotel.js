const { Schema, model } = require("mongoose")

const schema = new Schema({
  name: { type: String, required: [true, "A name for the hotel is required!"], minLength: 4},
  city: { type: String, required: [true, "A city which the hotel is located in is required!"], minLength: 3},
  imageUrl: { type: String, required: [true, "An image with a valid URL is required!"], match: [/^https?/, "Image must be a valid URL"] },
  rooms: { type: Number, required: [true, "The number of rooms that the hotel provides are required to be listed!"], min: 1, max: 100 },
  bookedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
})

module.exports = model("Hotel", schema)
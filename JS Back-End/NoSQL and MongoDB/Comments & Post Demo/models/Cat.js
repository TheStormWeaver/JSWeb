const mongoose = require("mongoose")

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validator: function (value) {
      const letter = value.slice(0, 1);
      return latter === letter.toUpperCase();
    },
    message: "Invalid name",
  },
  color: {
    type: String,
    required: true,
    enum: {
      values: ["Grey", "Orange", "Turquoise", "White"],
      message: "Color must be one of the listed",
    },
  },
});
const Cat = mongoose.model("Cat", catSchema);

module.exports = Cat

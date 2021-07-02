const { Schema, model } = require("mongoose")

const schema = new Schema({
  make: {type: String},
  model: {type: String},
  year: {type: Number},
  description: {type: String},
  price: {type: Number},
  img: {type: String},
  material: {type: String},
})

module.exports = model("Furniture", schema)
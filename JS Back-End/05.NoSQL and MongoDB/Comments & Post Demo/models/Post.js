const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
  title: { type: String, required: true },
  content: { type: String, minLength: 10 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
})

module.exports = mongoose.model("Post", schema)

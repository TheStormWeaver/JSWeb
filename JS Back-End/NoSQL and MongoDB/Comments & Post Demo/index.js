const mongoose = require("mongoose");
const Post = require("./models/Post");
const Person = require("./models/Person");
const Cat = require("./models/Cat");

start()

async function start() {
  const connectionStr = "mongodb://localhost27017";

  const client = await mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Database connected");

  const post = await Post.findOne({}).populate("author").populate("comments")
  const comment = new Comment({
    author: post.author,
    content: "First Comment",
    post
  })
  await comment.save()

  post.comments.push(comment)

  await post.save()
}

const Play = require("../models/Play");
const User = require("../models/User");

async function getAllPlays() {
  const plays = await Play.find({ public: true }).sort({ createdAt: -1 }).lean(); // used for sorting by date (-1) from the newest to the oldest

  return plays;
}

async function getPlayById(id) {
  const play = await Play.findById(id).lean();

  return play;
}

async function createPlay(playData) {
  const pattern = new RegExp(`^${playData.title}$`, "i");
  const existing = await Play.findOne({ title: { $regex: pattern } });

  if(existing) {
    throw new Error("A play with this name already exists!")
  }

  const play = await new Play(playData);
  await play.save();

  return play;
}

async function editPlay(id, playData) {
  const play = await Play.findById(id);

  play.title = playData.title;
  play.description = playData.description;
  play.imageUrl = playData.imageUrl;
  play.public = Boolean(playData.public); //requires the Boolean(), otherwise throws an error

  return play.save();
}

async function deletePlay(id) {
  return Play.findByIdAndDelete(id);
}

async function likePlay(playId, userId) {
  const play = await Play.findById(playId);

  play.usersLiked.push(userId)

  return play.save()
}

module.exports = {
  getAllPlays,
  getPlayById,
  createPlay,
  editPlay,
  deletePlay,
  likePlay,
};

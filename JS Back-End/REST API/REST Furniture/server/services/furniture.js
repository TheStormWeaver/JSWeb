const Furniture = require("../models/Furniture")

async function getAll() {
  return Furniture.find({}).lean()
}

async function getById(id) {
  return Furniture.findById(id).lean()

}

module.exports = {
  getAll,
  getById
}
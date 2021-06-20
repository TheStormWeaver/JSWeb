const Hotel = require("../models/Hotel")

async function createHotel(hotelData) {
  const hotel = new Hotel(hotelData)
  await hotel.save()

  return hotel
}

async function getAllHotels() {
  const hotels = await Hotel.find({}).lean()

  return hotels
}

async function getHotelById(id) {
  const hotel = await Hotel.findById(id).lean()

  return hotel
}

async function editHotel(id, hotel) {
  const existing = await Hotel.findById(id);

  if (!existing) {
    throw new ReferenceError("No such ID in database");
  }

  Object.assign(existing, hotel);
  return existing.save();
}


module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  editHotel,
}
const Trip = require("../models/Trip");

async function getAllTrips() {
  const trips = await Trip.find({}).lean()

  return trips;
}

async function getTripById(id) {
  const trip = await Trip.findById(id).lean();

  return trip;
}

async function createTrip(tripData) {
  const trip = await new Trip(tripData);
  await trip.save();

  return trip;
}

async function editTrip(id, tripData) {
  const trip = await Trip.findById(id);

  trip.startPoint = tripData.startPoint;
  trip.endPoint = tripData.endPoint;
  trip.date = tripData.date;
  trip.time = tripData.time;
  trip.imageUrl = tripData.imageUrl;
  trip.brand = tripData.brand;
  trip.seats = tripData.seats;
  trip.price = tripData.price;
  trip.description = tripData.description;

  return trip.save();
}

async function deleteTrip(id) {
  return Trip.findByIdAndDelete(id);
}

async function joinTrip(tripId, userId) {
  const trip = await Trip.findById(tripId)
  console.log(trip)

  trip.buddies.push(userId)

  return trip.save()
}

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  editTrip,
  deleteTrip,
  joinTrip,
};
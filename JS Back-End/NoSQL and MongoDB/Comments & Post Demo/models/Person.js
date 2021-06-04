const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: {
    type: Number,
    min: [0, "Age cannot be nagtive"]
  }
});
personSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

personSchema.methods.sayHi = function () {
  console.log(`My name is ${this.firstName} and i am ${this.age} years old.`);
};

const Person = mongoose.model("Person", personSchema);

module.exports = Person

const mongoose = require("mongoose");
const Schema = mongoose.Schema;// Create Schema
const BookSchema = new Schema({
    movie: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required:true
    },
    code: {
      type: String,
      required:true
    },
  });module.exports = Booking = mongoose.model("booking", BookSchema);
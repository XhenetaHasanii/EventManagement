//include mongoose
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const schemaEvent = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
 
});

const EventModel = mongoose.model('EventModel', schemaEvent);
module.exports = EventModel;

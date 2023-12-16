const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const eventSchema=require('./eventModel');
const { eventSchema } = require('./eventModel.js');

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    events: [eventSchema]
  });
  
  
  module.exports = mongoose.model('Location', locationSchema);
  //module.exports=locationSchema;
  

//include mongoose
const mongoose = require('mongoose');
//const participantSchema=require('./participantModel');

const { participantSchema } = require('./participantModel.js');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  participants: [participantSchema],
  capacity:{ type:Number,required:true},
  eventOccurred:{type:Date}
});
module.exports = mongoose.model('Event', eventSchema);
module.exports.eventSchema = eventSchema; // Named export

//module.exports=eventSchema;

const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const participantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('Participant',participantSchema);
module.exports.participantSchema = participantSchema; // Named export

//module.exports=participantSchema;

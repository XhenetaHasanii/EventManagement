const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const locationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    events:[{type:Schema.Types.ObjectId, ref:'EventModel'}]
});

const LocationModel=mongoose.model('LocationModel',locationSchema);
module.exports=LocationModel;
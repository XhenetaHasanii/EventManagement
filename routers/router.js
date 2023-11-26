const mongoose = require('mongoose');

const EventModel = require('../models/eventModel.js');
const LocationModel = require('../models/locationModel.js');
const ParticipantModel = require('../models/participantModel.js');

const express = require('express');
const router = express.Router();



router.post('/',async(req,res)=>{
    const result=new LocationModel({
        name:req.body.name,
        address:req.body.address,
        events:req.body.events
    });
    try {
        const newResult=await result.save();
        res.status(201).json({'result':newResult});
        
    } catch (error) {
        res.status(500).json({'error':error.message});
        
    }
})
module.exports=router;

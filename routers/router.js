const mongoose = require('mongoose');

const Event = require('../models/eventModel.js');
const Location = require('../models/locationModel.js');
const Participant = require('../models/participantModel.js');

const express = require('express');
const router = express.Router();

router.post('/createLocation', async (req, res) => {
    const result = new Location({
        name: req.body.name,
        address: req.body.address,
        events: req.body.events
    })
    try {
        console.log(result);

        const newLocation = await result.save();
        res.status(201).json({ 'result': newLocation });

    } catch (error) {
        res.status(500).json({ 'error': error.message });

    }
})

router.post('/createEvent', async (req, res) => {
    const result = new Event({
        name: req.body.name,
        participants: req.body.participants

    })
    try {
        const newResult = await result.save();
        res.status(201).json({ 'result': newResult });
    }
    catch (error) {
        res.status(500).json({ 'error': error.message });
    }
})
router.post('/createParticipant', async (req, res) => {
    const result = new Participant({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const newResult = await result.save();
        res.status(201).json({ 'result': newResult });
    }
    catch (error) {
        res.status(500).json({ 'error': error.message });
    }
})


// me return numrin e pjesmarresve ne nje event 
// Endpoint to get the number of participants for a specific event
router.get('/events/:eventId/participants/count', async (req, res) => {
    try {
      const eventId = req.params.eventId;
  
      // Find the event by ID
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Get the count of participants
      const participantCount = event.participants.length;
  
      // Return the count as a response
      res.json({ participantCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;

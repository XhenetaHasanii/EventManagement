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
module.exports = router;

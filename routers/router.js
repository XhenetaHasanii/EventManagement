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
        events: req.body.events,

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
        participants: req.body.participants,
        capacity: req.body.capacity
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

// getting the number of participants for a specific event
router.get('/events/:eventId/participants/count', async (req, res) => {
    try {
        const eventId = req.params.eventId;


        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const participantCount = event.participants.length;

        res.json({ participantCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// adding a new participant 
router.post('/events/:eventId/participants', async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Find the event by ID
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        const { name, email } = req.body;

        const newParticipant = new Participant({ name, email });

        event.participants.push(newParticipant);

        await event.save();

        res.json({ participant: newParticipant });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// create a participant
//number of participants is limited 
router.post('/events/:eventId/participant', async (req, res) => {
    try {

        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);
        if (!event) {
            console.log("Event not found");
        }

        const newParticipant = new Participant({
            name: req.body.name,
            email: req.body.email

        })
        if (!event.participants.length >= event.capacity) {
            event.participants.push(newParticipant);
            await event.save();
            res.status(201).json({ "newParticipant": newParticipant })
        }
        else {
            console.log("Capacity is full");
        }
    }
    catch (error) {
        res.status(500).json({ "message": error.message })
    }
})

// returns all the events where the capacity is not full
router.get('/fetchAllEvents/capacityIsNotFull', async (req, res) => {
    try {

        const event = await Event.find();
        const newResult = (await event).filter((value) => {
            return value.capacity > value.participants.length;
        })
        console.log(newResult);
        res.status(200).json({ 'newResult': newResult });
    } catch (error) {

        res.status(500).json({ 'message': error.message });
    }
})

/*outer.get('/fetchParticipants/moreOneEvent', async (req, res) => {

    try {
        const result = await Event.find();
        const newResult = result.filter((value) => { return value.participants && value.participants.name === "Xheneta" })
        res.status(200).json({ 'newResult': result });
    }
    catch (error) {
        res.status(500).json({ 'error': error.message });
    }
})*/

// return the location that has the most events
router.get('/location-with-most-events', async (req, res) => {
    try {
        const locations = await Location.find().populate('events');

        let locationWithMostEvents = null;
        let maxEventCount = 0;

        locations.forEach(location => {
            const eventCount = location.events.length;
            if (eventCount > maxEventCount) {
                maxEventCount = eventCount;
                locationWithMostEvents = location;
            }
        });
        res.json(locationWithMostEvents);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// create newLocation
router.post('/createNewLocation', async (req, res) => {
    const newLocation = new Location({
        name: req.body.name,
        address: req.body.address,
        events: req.body.events
    })
    try {

        const newResult = await newLocation.save();
        res.status(201).json({ 'newResult': newResult });
    }
    catch (error) {
        res.status(500).json({ 'newResult': error.message });
    }

})
// return the locations that have less than 3 events
router.get('/location-with-less-three-events', async (req, res) => {
    try {
        const locations = await Location.find().populate('events');

        const filteredLocations = locations.filter((location) => {
            return location.events.length < 3;
        });

        res.status(200).json({ 'result': filteredLocations });
    } catch (error) {
        res.status(500).json({ 'error': error.message });
    }
});
// create newEvent
router.post('/createNewEvent', async (req, res) => {

    try {
        const event = new Event({
            name: req.body.name,
            participants: req.body.participants,
            capacity: req.body.capacity,
            eventOccurred: req.body.eventOccurred
        })
        const newEvent = await event.save();
        res.status(201).json({ 'newResult': newEvent });
    }
    catch (error) {
        res.status(500).json({ 'error': error.message });
    }

})

//create an endpoint that returns all the events held between December 1 and December 31, 2023
router.get('/getEvents/test', async (req, res) => {

    try {
        const startDate = new Date('2023.12.01');
        const endDate = new Date('2023.12.31');
        const events = await Event.find({
            eventOccurred: { $gte: startDate, $lte: endDate }
        });
        res.status(200).json({ 'newResult': events })
    }
    catch (error) {
        res.status(500).json({ 'error': error.message })
    }
})
module.exports = router;

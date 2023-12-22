const Event = require('../models/eventModel.js');
const Participant = require('../models/participantModel.js');

exports.createParticipant = async (req, res) => {
    const result = new Participant({
        name: req.body.name,
        email: req.body.email,
    });

    try {
        const newResult = await result.save();
        res.status(201).json({ result: newResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addParticipantToEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const { name, email } = req.body;
        const newParticipant = new Participant({ name, email });

        event.participants.push(newParticipant);
        await event.save();

        res.json({ participant: newParticipant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addParticipantToEventWithCapacityCheck = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const newParticipant = new Participant({
            name: req.body.name,
            email: req.body.email,
        });

        if (event.participants.length < event.capacity) {
            event.participants.push(newParticipant);
            await event.save();
            res.status(201).json({ newParticipant });
        } else {
            console.log('Capacity is full');
            res.status(400).json({ error: 'Capacity is full' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.fetchAllEventsWithCapacityNotFull = async (req, res) => {
    try {
        const events = await Event.find();
        const newResult = events.filter(value => value.capacity > value.participants.length);
        res.status(200).json({ newResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.fetchParticipantsForEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const participants = event.participants;
        res.status(200).json({ participants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};





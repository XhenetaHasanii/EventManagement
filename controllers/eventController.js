const Event = require('../models/eventModel.js');

exports.createEvent = async (req, res) => {
    const result = new Event({
        name: req.body.name,
        participants: req.body.participants,
        capacity: req.body.capacity,
    });

    try {
        const newResult = await result.save();
        res.status(201).json({ result: newResult });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createNewEvent = async (req, res) => {
    try {
        const event = new Event({
            name: req.body.name,
            participants: req.body.participants,
            capacity: req.body.capacity,
            eventOccurred: req.body.eventOccurred,
        });

        const newEvent = await event.save();
        res.status(201).json({ newResult: newEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.december2023 = async (req, res) => {
    try {
        const startDate = new Date('2023-12-01');
        const endDate = new Date('2023-12-31');
        const events = await Event.find({
            eventOccurred: { $gte: startDate, $lte: endDate },
        });
        res.status(200).json({ newResult: events });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//const Location = require('../models/locationModel.js');

exports.createLocation = async (req, res) => {
    const result = new Location({
        name: req.body.name,
        address: req.body.address,
        events: req.body.events,
    });

    try {
        const newLocation = await result.save();
        res.status(201).json({ result: newLocation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.locationWithMostEvents = async (req, res) => {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createNewLocation = async (req, res) => {
    const newLocation = new Location({
        name: req.body.name,
        address: req.body.address,
        events: req.body.events,
    });

    try {
        const newResult = await newLocation.save();
        res.status(201).json({ newResult });
    } catch (error) {
        res.status(500).json({ newResult: error.message });
    }
};

exports.locationWithLessThreeEvents = async (req, res) => {
    try {
        const locations = await Location.find().populate('events');

        const filteredLocations = locations.filter(location => {
            return location.events.length < 3;
        });

        res.status(200).json({ result: filteredLocations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};const Location = require('../models/locationModel.js');

exports.createLocation = async (req, res) => {
    const result = new Location({
        name: req.body.name,
        address: req.body.address,
        events: req.body.events,
    });

    try {
        const newLocation = await result.save();
        res.status(201).json({ result: newLocation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.locationWithMostEvents = async (req, res) => {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createNewLocation = async (req, res) => {
    const newLocation = new Location({
        name: req.body.name,
        address: req.body.address,
        events: req.body.events,
    });

    try {
        const newResult = await newLocation.save();
        res.status(201).json({ newResult });
    } catch (error) {
        res.status(500).json({ newResult: error.message });
    }
};

exports.locationWithLessThreeEvents = async (req, res) => {
    try {
        const locations = await Location.find().populate('events');

        const filteredLocations = locations.filter(location => {
            return location.events.length < 3;
        });

        res.status(200).json({ result: filteredLocations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
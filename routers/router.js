const express = require('express');
const router = express.Router();

const locationController = require('../controllers/locationController');
const eventController = require('../controllers/eventController');
const participantController = require('../controllers/participantController');

router.post('/createLocation', locationController.createLocation);
router.get('/location-with-most-events', locationController.locationWithMostEvents);
router.post('/createNewLocation', locationController.createNewLocation);
router.get('/location-with-less-three-events', locationController.locationWithLessThreeEvents);

router.post('/createEvent', eventController.createEvent);
router.post('/createNewEvent', eventController.createNewEvent);
router.get('/december2023', eventController.december2023);

router.post('/createParticipant', participantController.createParticipant);
router.post('/:eventId/participants', participantController.addParticipantToEvent);
router.post('/:eventId/participant', participantController.addParticipantToEventWithCapacityCheck);
router.get('/fetchAllEvents/capacityIsNotFull', participantController.fetchAllEventsWithCapacityNotFull);
router.get('/:eventId/participants', participantController.fetchParticipantsForEvent);

module.exports = router;

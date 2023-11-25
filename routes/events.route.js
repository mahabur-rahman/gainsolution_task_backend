const express = require('express')
const router = express.Router()
const { createEvent, updateEvent, deleteEvent, getEvent, getAllEvents } = require('../controllers/eventController')

// create event 
router.post('/create-event', createEvent)
// update event 
router.put('/:id', updateEvent)
// delete event 
router.delete('/:id', deleteEvent)
// single event 
router.get('/:id', getEvent)
// get all events 
router.get('/', getAllEvents)

module.exports = router
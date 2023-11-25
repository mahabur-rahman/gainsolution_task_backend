const Event = require("../models/event");

// create event
const createEvent = async (req, res) => {
  const newEvent = new Event(req.body);

  try {
    const savedEvent = await newEvent.save();
    return res.status(201).json(savedEvent);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// update event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.username === req.body.username) {
      try {
        const updatedEvent = await Event.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        return res.status(200).json(updatedEvent);
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can update only your Event!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

// delete Event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.username === req.body.username) {
      try {
        await Event.findByIdAndDelete(req.params.id);
        return res.status(200).json("Event has been deleted!");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can delete only your Event!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};


// get event 
const getEvent =  async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if(!event){
        return res.status(400).json('Event not found!')
      }
     return res.status(200).json(event);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

//   get all events 
const getAllEvents = async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let events;
      if (username) {
        events = await Event.find({ username });
      } else if (catName) {
        events = await Event.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        events = await Event.find();
      }

      return res.status(200).json(events);
    } catch (err) {
      res.status(500).json(err);
    }
  }


module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getAllEvents
};

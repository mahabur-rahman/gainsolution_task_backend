const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
   title: {type: String, required: true},
   description: {type:String, required: true},
   startDate: {type: String, required: true},
   endDate: {type: String, required: true},
   location: {type: String, required: true},
   photo: {type: String,  required: false},
   username: {type: String, required: true},
   categories: {type: Array, required: false}
}, {timestamps: true})


// model 
const Event = mongoose.model('Event', eventSchema)
module.exports = Event
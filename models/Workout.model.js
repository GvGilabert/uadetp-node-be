var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Routine = require('../models/Routine.model').schema;



var WorkoutSchema = new mongoose.Schema({
    scheduledTime: Number,
    startTime: Number,
    endTime: Number,
    routine: Routine,
    notes: String
    })

    WorkoutSchema.plugin(mongoosePaginate)
const Workout = mongoose.model('Workout', WorkoutSchema)

module.exports = Workout;
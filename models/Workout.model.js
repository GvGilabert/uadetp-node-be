var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Routine = require('../models/Routine.model').schema;
var Paciente = require('../models/Paciente.model').schema;

var WorkoutSchema = new mongoose.Schema({
    scheduledTime: Number,
    startTime: Number,
    endTime: Number,
    routine: Routine,
    notes: String,
    userId: String,
    paciente: Paciente
    })

    WorkoutSchema.plugin(mongoosePaginate)
const Workout = mongoose.model('Workout', WorkoutSchema)

module.exports = Workout;
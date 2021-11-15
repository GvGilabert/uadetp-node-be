var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Workout = require('../models/Workout.model').schema; 

var PacienteSchema = new mongoose.Schema({
    id: String,
    name: String,
    age: Number,
    enfermedadesPre01: String,
    enfermedadesPre02: String,
    enfermedadesPre03: String,
    workouts: [Workout]
})

PacienteSchema.plugin(mongoosePaginate)
const Paciente = mongoose.model('Paciente', PacienteSchema)

module.exports = Paciente;
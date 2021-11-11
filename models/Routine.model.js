var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Exercise = require('../models/Exercise.model').schema;


var RoutineSchema = new mongoose.Schema({
    id: String,
    name: String,
    color: String,
    exercises: [Exercise] 
    })

RoutineSchema.plugin(mongoosePaginate)
const Routine = mongoose.model('Routine', RoutineSchema)

module.exports = Routine;
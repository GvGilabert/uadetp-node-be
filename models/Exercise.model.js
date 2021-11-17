var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Metric = require('../models/Metric.model').schema;

var ExerciseSchema = new mongoose.Schema({
    id: String,
    name: String,
    type: String,
    endTime: Date,
    sequence: Number,
    startTime: Date,
    url: String,
    metrics: [Metric],
    notes: String,
    userId: String
})

ExerciseSchema.plugin(mongoosePaginate)
const Exercise = mongoose.model('Exercise', ExerciseSchema)

module.exports = Exercise;

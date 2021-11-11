var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var MetricSchema = new mongoose.Schema({
    name: String,
    uom: String,
    value: String
})

MetricSchema.plugin(mongoosePaginate)
const Metric = mongoose.model('Metric', MetricSchema)

module.exports = Metric;

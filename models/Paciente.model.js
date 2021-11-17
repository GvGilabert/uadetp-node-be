var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var PacienteSchema = new mongoose.Schema({
    name: String,
    age: Number,
    genero: String,
    enfermedadesPre01: String,
    enfermedadesPre02: String,
    enfermedadesPre03: String,
    userId: String
})

PacienteSchema.plugin(mongoosePaginate)
const Paciente = mongoose.model('Paciente', PacienteSchema)

module.exports = Paciente;
var PacientesService = require('../services/pacientes.service');
var user = require('../auth/getUser');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getPacientes = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    try {
        var Pacientes = await PacientesService.getPacientes({userId: user(req)}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        console.log(Pacientes.docs);
        return res.status(200).json(Pacientes.docs);
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createPaciente = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Paciente = {
        name: req.body.name,
        genero: req.body.genero,
        age: req.body.age,
        enfermedadesPre01: req.body.enfermedadesPre01,
        enfermedadesPre02:req.body.enfermedadesPre02,
        enfermedadesPre03:req.body.enfermedadesPre03,
        userId: user(req)
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdPaciente = await PacientesService.createPaciente(Paciente)
        return res.status(201).json(Paciente)
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Paciente Creation was Unsuccesfull"})
    }
}

exports.updatePaciente = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Paciente = {
        _id: req.body._id,
        name: req.body.name ? req.body.name : null,
        genero: req.body.genero ? req.body.genero : null,
        age: req.body.age ? req.body.age : null,
        enfermedadesPre01: req.body.enfermedadesPre01 ? req.body.enfermedadesPre01 : null,
        enfermedadesPre02: req.body.enfermedadesPre02 ? req.body.enfermedadesPre02 : null,
        enfermedadesPre03: req.body.enfermedadesPre03 ? req.body.enfermedadesPre03 : null,
        workouts: req.body.workouts ?  req.body.workouts : null
    }

    try {
        var updatedPaciente = await PacientesService.updatePaciente(Paciente)
        return res.status(200).json(Paciente)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.removePaciente = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await PacientesService.deletePaciente(id);
        return res.status(204).json();
    } catch (e) {
        return res.status(400).json(e.message)
    }
}  
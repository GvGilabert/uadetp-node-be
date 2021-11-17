// Gettign the Newly created Mongoose Model we just created 
var Paciente = require('../models/Paciente.model');
//var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getPacientes = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Pacientes = await Paciente.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Pacientes;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Pacientes');
    }
}


exports.createPaciente = async function (paciente) {
    // Creating a new Mongoose Object by using the new keyword  
    var newPaciente = new Paciente({
        name: paciente.name,
        genero: paciente.genero,
        age: paciente.age,
        enfermedadesPre01: paciente.enfermedadesPre01,
        enfermedadesPre02: paciente.enfermedadesPre02,
        enfermedadesPre03: paciente.enfermedadesPre03,
        userId: paciente.userId
    })

    try {
        // Saving the User 
        var savedPaciente = await newPaciente.save();
        var token = jwt.sign({
            id: savedPaciente._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Paciente")
    }
}

exports.updatePaciente = async function (paciente) {
    
    try {
        //Find the old User Object by the Id
        var oldPaciente = await Paciente.findById(paciente._id);
    } catch (e) {
        throw Error("Error occured while Finding the Paciente")
    }
    // If no old User Object exists return false
    if (!oldPaciente) {
        return false;
    }
    //Edit the User Object
    oldPaciente.name = paciente.name,
    oldPaciente.genero = paciente.genero,
    oldPaciente.age = paciente.age,
    oldPaciente.enfermedadesPre01 = paciente.enfermedadesPre01,
    oldPaciente.enfermedadesPre02 = paciente.enfermedadesPre02,
    oldPaciente.enfermedadesPre03 = paciente.enfermedadesPre03,
    oldPaciente.workouts = paciente.workouts 

    try {
        var savedPaciente = await oldPaciente.save()
        return savedPaciente;
    } catch (e) {
        throw Error("And Error occured while updating the Paciente");
    }
}

exports.deletePaciente = async function (id) {

    // Delete the Routine
    try {
        var deleted = await Paciente.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Paciente Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Paciente")
    }
}

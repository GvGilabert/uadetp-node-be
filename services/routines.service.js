// Gettign the Newly created Mongoose Model we just created 
var Routine = require('../models/Routine.model');
//var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this




exports.getRoutines = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Routines = await Routine.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Routines;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Users');
    }
}

exports.createRoutine = async function (routine) {
    // Creating a new Mongoose Object by using the new keyword  
    var newRoutine = new Routine({
        name: routine.name,
        color: routine.color,
        exercises: routine.exercises,
        userId: routine.userId
    })

    try {
        // Saving the User 
        var savedRoutine = await newRoutine.save();
        var token = jwt.sign({
            id: savedRoutine._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Routine")
    }
}


exports.updateRoutine = async function (routine) {
    
    try {
        //Find the old User Object by the Id
        var oldRoutine = await Routine.findById(routine._id);
    } catch (e) {
        throw Error("Error occured while Finding the Routine")
    }
    // If no old User Object exists return false
    if (!oldRoutine) {
        return false;
    }
    //Edit the User Object
    oldRoutine.name = routine.name
    oldRoutine.color = routine.color
    oldRoutine.exercises = routine.exercises
    try {
        var savedRoutine = await oldRoutine.save()
        return savedRoutine;
    } catch (e) {
        throw Error("And Error occured while updating the Routine");
    }
}

exports.deleteRoutine = async function (id) {

    // Delete the Routine
    try {
        var deleted = await Routine.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Routine Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Routine")
    }
}

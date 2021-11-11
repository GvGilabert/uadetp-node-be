// Gettign the Newly created Mongoose Model we just created 
var Exercise = require('../models/Exercise.model');
//var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

exports.getExerciseHistoryById = async function (req,res){


    var Exercises = await Exercise.paginate(req.query,req.query.options,req.query.limit)
    return Exercises;
}

exports.getExercise = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Exercises = await Exercise.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Exercises;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Exercises');
    }
}


exports.createExercise = async function (exercise) {
    // Creating a new Mongoose Object by using the new keyword  
    var newExercise = new Exercise({
        name: exercise.name,
        type: exercise.type,
        url: exercise.url,
        metrics: exercise.metrics
    })

    try {
        // Saving the User 
        var savedExercise = await newExercise.save();
        var token = jwt.sign({
            id: savedExercise._id
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

exports.updateExercise = async function (exercise) {
    
    try {
        //Find the old User Object by the Id
        var oldExercise = await Exercise.findById(exercise._id);
    } catch (e) {
        throw Error("Error occured while Finding the Exercise")
    }
    // If no old User Object exists return false
    if (!oldExercise) {
        return false;
    }
    //Edit the User Object
    oldExercise.name = exercise.name
    oldExercise.type = exercise.type
    oldExercise.url = exercise.url
    oldExercise.metrics = exercise.metrics
    try {
        var savedExercise = await oldExercise.save()
        return savedExercise;
    } catch (e) {
        throw Error("And Error occured while updating the Exercise");
    }
}

exports.deleteExercise = async function (id) {

    // Delete the Routine
    try {
        var deleted = await Exercise.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Exercise Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Exercise")
    }
}

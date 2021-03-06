// Gettign the Newly created Mongoose Model we just created 
var Workout = require('../models/Workout.model');
//var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

exports.getWorkouts = async function (query, page, limit) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA????")
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Workouts = await Workout.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise

        return Workouts;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Workouts');
    }
}


exports.getWorkoutsHistory = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query history",query)
        var Workouts = await Workout.paginate({endTime: {"$ne":null}}, options)
        // Return the Userd list that was retured by the mongoose promise
        console.log(Workouts.docs)
        return Workouts;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Workouts');
    }
}

exports.getWorkoutsHistoryById = async function (param) {
   
    // Try Catch the awaited promise to handle the error 
    try {
        var Workouts = await Workout.findById(param)
        // Return the Userd list that was retured by the mongoose promise
        console.log(Workouts)
        return Workouts;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Workouts');
    }
}

exports.createWorkout = async function (workout) {
    // Creating a new Mongoose Object by using the new keyword  
    var newWorkout = new Workout({
        scheduledTime: workout.scheduledTime,
        startTime:workout.startTime,
        endTime: workout.endTime,
        routine: workout.routine,
        notes: workout.notes,
        userId: workout.userId,
        paciente: workout.paciente
    })

    try {
        // Saving the User 
        var savedWorkout = await newWorkout.save();
        var token = jwt.sign({
            id: savedWorkout._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return newWorkout;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Workout")
    }
}

exports.getWorkoutsCount = async function (){
    try {
        var Workouts = await Workout.countDocuments({});
        // Return the Userd list that was retured by the mongoose promise
        console.log(Workouts);
        return Workouts;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while Paginating Workouts');
    }
}

exports.updateWorkout = async function (workout) {
    
    try {
        //Find the old User Object by the Id
        var oldWorkout = await Workout.findById(workout._id);
    } catch (e) {
        throw Error("Error occured while Finding the Workout")
    }
    // If no old User Object exists return false
    if (!oldWorkout) {
        return false;
    }
    //Edit the User Object
    oldWorkout.scheduledTime = workout.scheduledTime,
    oldWorkout.startTime = workout.startTime,
    oldWorkout.endTime = workout.endTime,
    oldWorkout.routine = workout.routine,
    oldWorkout.notes = workout.notes
    oldWorkout.paciente = workout.paciente

    try {
        var savedWorkout = await oldWorkout.save()
        return [savedWorkout];
    } catch (e) {
        throw Error("And Error occured while updating the workout");
    }
}

exports.deleteWorkout = async function (id) {
    console.log(id)
    // Delete the Routine
    try {
        var deleted = await Workout.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("workout Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the workout")
    }
}

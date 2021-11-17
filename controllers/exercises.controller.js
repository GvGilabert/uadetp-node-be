var ExerciseService = require('../services/exercises.service');
var user = require('../auth/getUser');

// Saving the context of this module inside the _the variable
_this = this;



exports.getExerciseHistoryById = async function (req, res, next){

    try {
        var Exercises = await ExerciseService.getExerciseHistoryById (req, res)
        // Return the Users list with the appropriate HTTP password Code and Message.
        res.header('X-Total-Count', Exercises.docs.length);
        return res.status(200).json(Exercises.docs);
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }

}

// Async Controller function to get the To do List
exports.getExercises = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    try {
        var Exercises = await ExerciseService.getExercise({userId: user(req)}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        res.header('X-Total-Count', Exercises.docs.length);
        return res.status(200).json(Exercises.docs);
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createExercise = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Exercise = {
        name: req.body.name,
        type: req.body.type,
        url: req.body.url,
        metrics: req.body.metrics,
        userId: user(req)
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdExercise = await ExerciseService.createExercise(Exercise)
        return res.status(201).json(Exercise)
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Exercise Creation was Unsuccesfull"})
    }
}

exports.updateExercise = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Exercise = {
        _id: req.body._id,
        name: req.body.name ? req.body.name : null,       
        type: req.body.type ? req.body.type : null,
        url: req.body.url ? req.body.url : null,
        metrics: req.body.metrics ? req.body.metrics : null,
        userId: user(req)
    }

    try {
        var updatedExercise = await ExerciseService.updateExercise(Exercise)
        return res.status(200).json(Exercise)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

exports.removeExercise = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await ExerciseService.deleteExercise(id);
        return res.status(204).json();
    } catch (e) {
        return res.status(400).json(e.message)
    }
}  
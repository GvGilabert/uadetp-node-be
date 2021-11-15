var WorkoutsService = require('../services/workouts.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getWorkoutsHistory = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    //var limit = 10;
    try {
        var Workouts = await WorkoutsService.getWorkoutsHistory({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json(Workouts.docs);
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getWorkoutsHistoryById = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
     //var page = req.query.page ? req.query.page : 1
    //var limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    //var limit = 10;
    try {
  
        var Workout = await WorkoutsService.getWorkoutsHistoryById(req.params.id)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json(Workout);
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

// Async Controller function to get the To do List
exports.getWorkouts = async function (req, res, next) {
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

    //var limit = 10;
    try {
        var Workouts = await WorkoutsService.getWorkouts({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json(Workouts.docs);
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getWorkoutsHistoryCount = async function (req, res, next) {
        try {
            var WorkoutsCount = await WorkoutsService.getWorkoutsCount()
            // Return the Users list with the appropriate HTTP password Code and Message.
            console.log(WorkoutsCount)
            return res.status(200).json(WorkoutsCount);
        } catch (e) {
            //Return an Error Response Message with Code and the Error Message.
            return res.status(400).json({status: 400, message: e.message});
        }
    };

exports.createWorkout = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Workout = {
        scheduledTime: req.body.scheduledTime,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        routine: req.body.routine,
        notes: req.body.notes
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdWorkouts = await WorkoutsService.createWorkout(Workout)
        return res.status(201).json(createdWorkouts)
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Workouts Creation was Unsuccesfull"})
    }
}

exports.updateWorkout = async function (req, res, next) {

    var Workout = {
        _id: req.body._id,
        scheduledTime: req.body.scheduledTime,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        routine: req.body.routine,
        notes: req.body.notes
    }
    try {
        var updatedWorkout = await WorkoutsService.updateWorkout(Workout)
        return res.status(200).json(updatedWorkout)
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeWorkout = async function (req, res, next) {
    try {
        var deleted = await WorkoutsService.deleteWorkout(req.params.id);
        res.status(204).json();
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}  
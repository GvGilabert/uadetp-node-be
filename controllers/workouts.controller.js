var WorkoutsService = require('../services/workouts.service');

// Saving the context of this module inside the _the variable
_this = this;

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

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    //var limit = 10;
        return res.status(200).json(10);
        };



exports.createWorkout = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Workout = {
        name: req.body.name,
        age: req.body.age
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdWorkouts = await WorkoutsService.createWorkouts(Workout)
        return res.status(201).json({createdWorkouts, message: "Succesfully Created Workouts"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Workouts Creation was Unsuccesfull"})
    }
}

exports.updateWorkout = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Workout = {
       
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        password: req.body.password ? req.body.password : null
    }
    try {
        var updatedWorkout = await WorkoutsService.updateUser(Workout)
        return res.status(200).json({status: 200, data: updatedWorkout, message: "Succesfully Updated Workout"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeWorkout = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await UserService.deleteWorkout(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}  
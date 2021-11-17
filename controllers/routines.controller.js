var RoutinesService = require('../services/routines.service');
var user = require('../auth/getUser');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getRoutines = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit =  parseInt(req.query.limit) ?  parseInt(req.query.limit) : 10;
    try {
        var Routines = await RoutinesService.getRoutines({userId: user(req)}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json(Routines.docs);
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createRoutine = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Routine = {
        name: req.body.name,
        color: req.body.color,
        exercises: req.body.exercises,
        userId: user(req)
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdRoutine = await RoutinesService.createRoutine(Routine)
        return res.status(201).json(Routine)
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Routine Creation was Unsuccesfull"})
    }
}

exports.updateRoutine = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.name) {
        return res.status(400).json({status: 400., message: "Name be present"})
    }

    
    var Routine = {
        _id: req.body._id,
        name: req.body.name ? req.body.name : null,
        color: req.body.color ? req.body.color : null,
        exercises: req.body.exercises ? req.body.exercises : null,
        userId: user(req)
    }

    try {
        var updatedRoutine = await RoutinesService.updateRoutine(Routine)
        return res.status(200).json(updatedRoutine)
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeRoutine = async function (req, res, next) {

    try {
        console.log(req.params.id)
        var deleted = await RoutinesService.deleteRoutine(req.params.id);
        res.status(204).send();
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}  

/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var pacientes = require('./api/paciente.route')
var exercises = require('./api/exercise.route')
var routines = require('./api/routine.route')
var workouts = require('./api/workout.route')

router.use('/users', users);
router.use('/pacientes', pacientes);
router.use('/exercises',exercises);
router.use('/routines',routines);
router.use('/workouts',workouts);


module.exports = router;

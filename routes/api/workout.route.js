var express = require('express')
var router = express.Router()
var WorkoutController = require('../../controllers/workouts.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/Workout.routes');
  });
router.post('/',Authorization, WorkoutController.createWorkout)
router.get('/', WorkoutController.getWorkouts)
router.get('/history', WorkoutController.getWorkouts)
router.get('/history/count', WorkoutController.getWorkoutsHistoryCount)
router.delete('/:id', Authorization, WorkoutController.removeWorkout)
router.put('/:id',Authorization,WorkoutController.updateWorkout)


// Export the Router
module.exports = router;



//api/users
//api/users/registration
//api/users/login
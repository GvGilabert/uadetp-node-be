var express = require('express')
var router = express.Router()
var WorkoutController = require('../../controllers/workouts.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/Workout.routes');
  });

  router.get('/',Authorization, WorkoutController.getWorkouts)
  
  router.post('/',Authorization, WorkoutController.createWorkout)
  router.put('/:id',Authorization, WorkoutController.updateWorkout)
  router.delete('/:id',Authorization, WorkoutController.removeWorkout)
  
  router.get('/history/count',Authorization, WorkoutController.getWorkoutsHistoryCount)
  router.get('/history',Authorization, WorkoutController.getWorkoutsHistory)
  
  router.get('/history/:id',Authorization, WorkoutController.getWorkoutsHistoryById)
  router.put('/history/:id',Authorization, WorkoutController.updateWorkout)
  router.delete('/history/:id',Authorization, WorkoutController.removeWorkout)
  
  router.get('/:id', WorkoutController.getWorkoutsHistoryById)



// Export the Router
module.exports = router;



//api/users
//api/users/registration
//api/users/login
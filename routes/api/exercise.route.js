var express = require('express')
var router = express.Router()
var ExerciseController = require('../../controllers/exercises.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });

router.get('/', Authorization, ExerciseController.getExercises)
router.post('/', Authorization, ExerciseController.createExercise)
router.put('/:id',Authorization, ExerciseController.updateExercise)
router.delete('/:id', Authorization, ExerciseController.removeExercise)
router.get('/history', Authorization, ExerciseController.getExercises)
router.get('/history/:id', Authorization, ExerciseController.getExerciseHistoryById)

// Export the Router
module.exports = router;

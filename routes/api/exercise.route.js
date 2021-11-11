var express = require('express')
var router = express.Router()
var ExerciseController = require('../../controllers/exercises.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });

router.get('/', ExerciseController.getExercises)
router.post('/', ExerciseController.createExercise)
router.put('/:id',ExerciseController.updateExercise)
router.delete('/:id', ExerciseController.removeExercise)
router.get('/history', ExerciseController.getExercises)
router.get('/history/:id', ExerciseController.getExerciseHistoryById)

// Export the Router
module.exports = router;

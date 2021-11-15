var express = require('express')
var router = express.Router()
var RoutineController = require('../../controllers/routines.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/Routines.routes');
  });
router.post('/',Authorization, RoutineController.createRoutine)
router.get('/',Authorization, RoutineController.getRoutines)
router.delete('/:id',Authorization, RoutineController.removeRoutine)
router.put('/:id',Authorization, RoutineController.updateRoutine)

//router.put('/:id',Authorization,RoutineController.updateRoutine)

// Export the Router
module.exports = router;


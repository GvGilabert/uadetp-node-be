var express = require('express')
var router = express.Router()
var PacienteController = require('../../controllers/pacientes.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
  });

router.get('/', Authorization, PacienteController.getPacientes)
router.post('/', Authorization, PacienteController.createPaciente)
router.put('/:id',Authorization, PacienteController.updatePaciente)

// Export the Router
module.exports = router;



//api/users
//api/users/registration
//api/users/login
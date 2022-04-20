const MovieController = require('../controllers/movie-controller.js'),
    express = require('express'),
    router = express.Router();

router
    .get('/', MovieController.getAll) // es un middleware function por los parametros en el movie-controller
    .get('/agregar', MovieController.addForm)
    .get('/editar/:movie_id', MovieController.getOne)
    .post('/', MovieController.save)
    .post ('/actualizar/:movie_id', MovieController.save)        
    .post('/eliminar/:movie_id', MovieController.delete) // delete
    .use(MovieController.error404);

module.exports = router;
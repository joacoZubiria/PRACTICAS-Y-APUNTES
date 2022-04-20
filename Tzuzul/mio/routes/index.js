const express = require('express');
function prueba(app){
    const router = express.Router();
    app.use('/pruebas', router);

    router.get('/prueba', (req,res,next) => {
        return res.status(200).send('Prueba exitosa');
    });

    router.post('/guardar', (req, res, next) => {
        console.log(req.body)
        return res.status(201).send('Guardado con exito')
    });
}

module.exports = prueba
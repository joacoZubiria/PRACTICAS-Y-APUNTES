const express = require('express'),
router = express.Router();

function pug(req, res, next){
    let locals ={
        title: "kirimpampion",
        description: "cacapis"
    }
    res.render('index', locals);
}

function ejs(req,res,next){
    let locals = {
        title : "EJS",
        description : "ejs application",
        link : 'https://ejs.co/',
        estaciones : [
            ['Verano', ['Diciembre', 'Enero', 'Febrero']],
            ['Otoño', ['Marzo', 'Abril', 'Mayo']],
            ['Invierno', ['Junio', 'Julio', 'Agosto']],
            ['Primavera', ['Septiembre', 'Octubre', 'Noviembre']]
        ]
    };
    res.render('index', locals);
}

function error404(req, res, next){
    let error = new Error(),
    locals = {
        title: 'Error 404',
        description : 'Resource not founded',
        error : error
    }

    error.status = 404;

    res.render('error', locals);

    next();
}

router
    .get('/', (req, res) => {
    res.end('<h1>Terminamos la config</h1>');
    }) // cuando cargue el dom donde se ejecute se llama a esto.
    .get('/ejs', ejs)
    .use(error404);

module.exports = router;
const movies = require('../models/movies.js'),
    express = require('express'),
    router = express.Router();

// function pug(req, res, next){
//     let locals ={
//         title: "kirimpampion",
//         description: "cacapis"
//     }
//     res.render('index', locals);
// }

// function ejs(req,res,next){
//     let locals = {
//         title : "EJS",
//         description : "ejs application",
//         link : 'https://ejs.co/',
//         estaciones : [
//             ['Verano', ['Diciembre', 'Enero', 'Febrero']],
//             ['Otoño', ['Marzo', 'Abril', 'Mayo']],
//             ['Invierno', ['Junio', 'Julio', 'Agosto']],
//             ['Primavera', ['Septiembre', 'Octubre', 'Noviembre']]
//         ]
//     };
//     res.render('index', locals);
// }

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
    .get('/', (req, res, next) => {

        movies.getConnection((err, conn) => {

            if(err) throw err;

            conn.query('SELECT * FROM movie', (error, rows, fields) => {

                let locals = {
                    title : 'Lista de Películas',
                    data : rows // array de datos
                };

                res.render('index', locals);

                if(error) throw error;
            });
        });
    })
    .get('/agregar', (req, res, next) => {

        res.render('add', {title : 'Agregar Producto'})
    
    })
    .get('/editar/:movie_id', (req, res, next) => {

        movies.getConnection((err, conn) => {

            conn.query('SELECT * FROM movie WHERE movie_id = ?', req.params.movie_id, (error, row, field) => {

                if(error) throw error;
                let movieEdit = {
                    title : 'Editar Película',
                    data : row
                };

                res.render('edit', movieEdit);

            });

            conn.release();
        });
    })
    .post('/', (req, res, next) => {
        movies.getConnection((err, conn) => {

            let movie = {

                movie_id : req.body.movie_id, 
                title : req.body.title,
                release_year : req.body.release_year,
                rating : req.body.rating,
                image : req.body.image
            
            }
            
            conn.query('INSERT INTO movie SET ?;', movie, (err, rows, fields) =>{

                console.log(err)
                return (err) ? res.redirect('/agregar') : res.redirect('/');
            
            });

            conn.release()
        })
    })
    .post('/actualizar/:movie_id', (req, res, next) => {

        movies.getConnection((err, conn) => {

            if(err) next(new Error('Registro no Encontrado'));

            let movie = {

                title : req.body.title,
                release_year : req.body.release_year,
                rating : req.body.rating,
                image : req.body.image
            
            };

            conn.query(`UPDATE movie SET ? WHERE movie_id = ?`, [movie, req.body.movie_id], (err, row, field) => {
                if(err) throw err;

                res.redirect('/');
            })

            conn.release();
        })        
    })
    .post('/eliminar/:movie_id', (req, res, next) => {

        movies.getConnection((err, conn) => {

            if(err) next(new Error('Registro no Encontrado'));

            conn.query('DELETE FROM movie WHERE movie_id = ?;', req.params.movie_id, (error, rows, fields) => {
                if(error) throw error
                res.redirect('/');
            });

            conn.release();
        })
    })
    .use(error404);

module.exports = router;
const myConn = require('../models/movie-connection');
const MovieModel = require('../models/movie-model');

class MovieController{ // modifica las vistas 
    constructor(){

    }

    static getAll(req, res, next){
        MovieModel.getAll((err, rows, fields) => {
            
            let locals = {
                title : 'Lista de Películas',
                data : rows // array de datos
            };

            res.render('index', locals);

            if(err) throw err;

        })
    }

    static getOne(req, res, next){

        MovieModel.getOne((err, rows, fields) => {
            if(err) throw err;
            
                let movieEdit = {
                    title : 'Editar Película',
                    data : rows
                };

                res.render('edit', movieEdit);
        }, req.params.movie_id);

    }

    static save(req, res, next){

        let movie = {
            movie_id : req.body.movie_id,
            title : req.body.title,
            release_year : req.body.release_year,
            rating : req.body.rating,
            image : req.body.image
        };

        MovieModel.update(movie, (err, rows, fields) => {
            if(err) throw err;

            res.redirect('/');
        });

    }
    
    static delete(req, res, next){

        MovieModel.delete((err, rows, fields) => {
            if(err) throw err
            res.redirect('/');
        }, req.params.movie_id)
    }

    static addForm(req, res, next){
        res.render('add', {title : 'Agregar Producto'})
    }

    static error404(req, res, next){
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
}

module.exports = MovieController;
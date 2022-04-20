const myConn = require('../models/movie-connection');
const MovieModel = require('../models/movie-model');

class MovieController{ // modifica las vistas 

    static getAll(req, res, next){
        MovieModel.getAll( (data) => {
            
            let locals = {
                title : 'Lista de Películas',
                data : data // objeto de datos
            };

            res.render('index', locals);

            if(err) throw err;

        })
    }

    static getOne(req, res, next){

        MovieModel.getOne( req.param.movie_id, data => {  

                let movieEdit = {
                    title : 'Editar Película',
                    data : data
                };

                res.render('edit', movieEdit);
        });

    }

    static save(req, res, next){

        let movie = {
            movie_id : req.body.movie_id,
            title : req.body.title,
            release_year : req.body.release_year,
            rating : req.body.rating,
            image : req.body.image
        };

        MovieModel.update(movie, () => {
            res.redirect('/');
        });

    }
    
    static delete(req, res, next){

        MovieModel.delete( req.params.movie_id, () => {
            res.redirect('/');
        });
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
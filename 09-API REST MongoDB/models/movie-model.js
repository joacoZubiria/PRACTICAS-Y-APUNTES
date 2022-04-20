const conn = require('./movie-connection.js');

class MovieModel{ // se conecta a la base de datos
    constructor(){

    }

    static getAll(cb){
        conn
            .find({})
            .then(docs => cb(docs))
            .catch(err => {
                if(err) throw err;
            });
    }

    static getOne(parameter, cb){
        conn
            .findOne({movie_id : parameter})
            .then(data => {
                cb(data);
            })
            .catch(err => {
                throw err;
            })
    }

    static save(movie, cb){
        
        conn.count( {movie_id : movie.movie_id} )
            .then( counted => {
                if( counted == 0 ){
                    conn
                        .create(movie)
                        .then(cb())
                        .catch(err => {
                            if (err) throw err;
                        })
                }else{
                    conn.findByIdAndUpdate(
                        {movie_id : movie.movie_id}, 
                        {
                            title : movie.title,
                            release_year : movie.release_year,
                            rating : movie.rating,
                            image : movie.image
                        }, err => { if (err) throw err; cb()})
                }
            })
    }

    static delete(parameter, cb){
        conn.remove({movie_id : parameter}, err => {if (err) throw err; cb()});
    }
}

module.exports = MovieModel;
const mysql = require('./movie-connection.js');

class MovieModel{ // se conecta a la base de datos
    constructor(){

    }

    static getAll(cb){
        mysql.getConnection((err, conn) => {
            if(err) throw err;

            conn.query('SELECT * FROM movie', cb);
            conn.release()
        })
    }

    static getOne(cb, parameter){
        mysql.getConnection((err, conn) => {
            if(err) throw err;
            conn.query('SELECT * FROM movie WHERE movie_id = ?', parameter, cb);
            conn.release();
        })
    }

    static save(cb, movie){
        mysql.getConnection((err, conn) => {

            if(err) throw err;

            conn.query('SELECT * FROM movie WHERE movie_id = ?', movie.movie_id, (err, rows) => {

                if(err) next(new Error('Registro no Encontrado'));

                if(rows.length == 1){

                    conn.query(`UPDATE movie SET ? WHERE movie_id = ?;`, [movie, movie.movie_id], cb);

                }else{

                    conn.query('INSERT INTO movie SET ?;', movie, cb);
                    
                }
            })
            conn.release();
        });
    }

    static delete(cb, parameter){

        mysql.getConnection((err, conn) => {
            if(err) throw err;
            conn.query('DELETE FROM movie WHERE movie_id = ?;', parameter, cb);
            conn.release();
        })

    }
}

module.exports = MovieModel;
const mysql = require('mysql'),
    dbObject = {
        connectionLimit : 10,
        host : "localhost",
        port : 3306,
        user : 'root',
        password : 'root',
        database : 'movies'
    }

const Movies = mysql.createPool(dbObject);

module.exports = Movies;
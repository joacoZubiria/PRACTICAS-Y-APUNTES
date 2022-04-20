const mysql = require('mysql'),
    conf = require('./db-conf.json');
    dbObject = {
        connectionLimit : conf.mysql.connectionLimit,
        host : conf.mysql.host,
        port : conf.mysql.port,
        user : conf.mysql.user,
        password : conf.mysql.password,
        database : conf.mysql.database
    }

const myConn = mysql.createPool(dbObject);
module.exports = myConn;

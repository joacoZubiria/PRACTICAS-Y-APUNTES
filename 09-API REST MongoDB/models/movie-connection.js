const mongoose = require('mongoose'),
    conf = require('./db-conf.json'),
    MovieSchema = mongoose.Schema({
        host : "string",
        port : "string",
        user : "string",
        password : "string",
        database : "string"
    },
    {collection : "movie"}),
    MovieModel = mongoose.model('Movie', MovieSchema);
mongoose.connect(`mongoose://${conf.mongo.host}/${conf.mongo.database}`); 
module.exports = MovieModel;

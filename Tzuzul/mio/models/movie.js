const {mongoose} = require('../config/db');

const {Schema} = mongoose;

const movieModel = new Schema({
    title: String,
    rating: Number,
    date: Date
});

const MovieModel = mongoose.model("movies", movieModel);

module.exports = MovieModel;
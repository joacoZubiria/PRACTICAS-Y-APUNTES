const mongoose = require('mongoose');

const {Schema} = mongoose;

const reviewSchema = new Schema({
    username: String,
    movieName: String,
    rating: Number,
    comment: String
});

const ReviewModel = mongoose.model("reviews", reviewSchema);

module.exports = ReviewModel;

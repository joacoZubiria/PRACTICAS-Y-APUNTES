const res = require('express/lib/response');
const MovieModel = require('../models/movie.js');

class Movies{
    async getId(id){
        try{
            const movie = await MovieModel.findById(id);
            return movie;
        }catch(err){
            return {statusText: 'Not-Found', status: 404};
        }
    }

    async getAll(){
        const movies = await MovieModel.find();
        return movies;
    }

    async create(data){
        const movie = await MovieModel.create(data);
        return movie;
    }

    async update(id, data){
        const movie = await MovieModel.findByIdAndUpdate(id, data, {new:true});
        return movie;
    }

    async delete(id){
        const movie = await MovieModel.findByIdAndDelete(id);
        return movie;
    }
}

module.exports = Movies;
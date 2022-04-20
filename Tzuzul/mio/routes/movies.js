const express = require('express');
const Movies = require('../services/movies');
const {isEditor} = require('../middleware/auth');

function movies(app){
    const router = express.Router();
    const movieService = new Movies();
    app.use('/movies', router);

    router.get('/:id', async (req, res, next) => {
        console.log(req.params);
        const {id} = req.params
        const movie = await movieService.getId(id);
        if(movie.status === 404) return res.status(404).json(movie);
        return res.status(200).json(movie);
    });

    router.get('/', async (req, res) => {
        const movies = await movieService.getAll();
        return res.status(200).json(movies);
    });

    router.post('/', isEditor, async (req, res, next) => {
        console.log(req.body);
        const movie = await movieService.create(req.body);
        return res.status(201).json(movie);
    });

    router.put('/:id', isEditor, async (req, res, next) => {
        const {id} = req.params;
        const movie = await movieService.update(id, req.body);
        return res.status(204).json(movie);
    });

    router.delete('/:id', isEditor, async (req, res, next) => {
        const {id} = req.params;
        const movie = await movieService.delete(id);
        return res.status(202).json(movie);
    })
}

module.exports = movies;
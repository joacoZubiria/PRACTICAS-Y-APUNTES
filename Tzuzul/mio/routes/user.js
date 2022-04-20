const express = require('express');
const User = require('../services/user');
const {isAdmin} = require('../middleware/auth');

function users(app){
    const router = express.Router();
    const userService = new User();
    app.use('/users', router);

    router.get('/', isAdmin, async (req, res, next) => {
        console.log(req.user)
        const users = await userService.getAll();
        return res.status(200).json(users);
    });

    router.get('/:id', isAdmin, async (req, res, next) => {
        const {id} = req.params;
        const user = await userService.get(id);
        if(user.status === 404) return res.status(404).json(user);
        return res.status(200).json(user);
    });

    router.post('/', isAdmin, async (req, res, next) => {
        const user = await userService.create(req.body);
        return res.status(201).json(user);
    });

    router.put('/:id', isAdmin, async (req, res, next) => {
        const {id} = req.params;
        const user = await userService.update(id, req.body);
        return res.status(204).json(user);
    });

    router.delete('/:id', isAdmin, async (req, res, next) => {
        const {id} = req.params;
        const user = userService.delete(id);
        return res.status(202).json(user);
    });
}

module.exports = users;
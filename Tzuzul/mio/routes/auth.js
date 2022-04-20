const express = require('express');
const Auth = require('../services/auth.js');
//const passport = require('passport');
const { route } = require('express/lib/application');

function auth(app){
    // passport.serializeUser(function(user, cb) {
    //     process.nextTick(function() {
    //       cb(null, { id: user.id, username: user.username, name: user.name });
    //     });
    //   });
      
    //   passport.deserializeUser(function(user, cb) {
    //     process.nextTick(function() {
    //       return cb(null, user);
    //     });
    //   });
    const router = express.Router();
    const authService = new Auth();

    app.use('/auth', router);

    router.post('/login', async (req, res, next) => {
        const {email, password} = req.body;
        const response = await authService.login(email, password);
        return res.cookie("token", response.token,{
            httpOnly:true,
            // secure:true,
            // sameSite:"none"
        }).json(response);
    });

    // router.get('/login/google', passport.authenticate('google'));
    
    // router.get('oauth2/redirect/google', passport.authenticate('google', {
    //     successRedirect:'/',
    //     failureRedirect:'/login'
    // }));

    router.post('/signup', async (req, res, next) => {
        const response = await authService.signup(req.body);
        if(response.status != false){
            return res.cookie("token", response.token,{
                httpOnly:true,
                // secure:true,
                // sameSite:"none" para el insomnia
            }).json(response);
        }
        return res.json({status: "nao"});
    });
    
    router.post('/logout', (req,res,next) => {
        return res.cookie("token","",{
            httpOnly:true,
            // secure:true,
            // sameSite:"none",
            expires:new Date()
        }).json({loggedOut: true});
    })

    // router.post('/logout', function(req, res, next) {
    //     req.logout();
    //     res.redirect('/');
    //   });
}

module.exports = auth;
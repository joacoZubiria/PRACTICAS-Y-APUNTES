const { parse } = require('dotenv');
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config');

const roles = {
    GUEST: 5,
    REGULAR: 7,
    EDITOR: 8,
    ADMIN: 10
}
const handleToken = (token,req,res,next) => {
    try{    
        const decoded = jwt.verify(token,jwt_secret);
        req.user = decoded;
        req.user.role = parseInt(req.user.role)

        return validateRole(req,res,next);
    }catch(err){
        return res.status(403).json({status:"Expired", message: "A valid token is required for this process"});
    }
}

const validateRole = (req,res,next) => {
    console.log(req.user.role, req.neededRole)

    if(req.user.role >= req.neededRole) {return next()};

    if(req.user.role >= req.neededRole) {return next()};

    if(req.user.role >= req.neededRole){return next()};

    if(req.user.role === 10 && req.user.role === req.neededRole) {return next()};

    return res.status(403).json({status:'Insuficient permissions', message: "A superior role is required for this action"})
}

const verifyToken = (req, res, next) => {
    const auth = req.header('Authorization');
    const cookies = req.cookies;

    if(!auth && !cookies.token){
        return res.status(403).json({status:"No-Auth", message: 'A token is required for this process'});
    } 

    if(cookies.token) return handleToken(cookies.token,req,res,next);
    else{
        const token = auth.split(" ")[1];
        return handleToken(token,req,res,next);
    }
}

const isAdmin = (req,res,next) => {
    req.neededRole = roles.ADMIN;
    return verifyToken(req,res,next)
}

const isRegular = (req,res,next) => {
    req.neededRole = roles.REGULAR;
    return verifyToken(req,res,next);
}

const isEditor = (req,res,next) => {
    req.neededRole = roles.EDITOR;
    return verifyToken(req,res,next);
}

const isGuest = (req,res,next) => {
    req.neededRole = roles.GUEST;
    return verifyToken(req,res,next);
}
module.exports = {isRegular, isAdmin, isEditor, isGuest};
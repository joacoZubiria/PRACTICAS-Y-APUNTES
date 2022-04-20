const User = require('./user');
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config');
const bcrypt = require('bcrypt');

class Auth{
    constructor(){
        this.user = new User();
    }

    async hashPassword(password){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);

        return hash;
    }
    
    async comparePassword(password, hash){
        const comparison = await bcrypt.compare(password, hash);
        console.log(comparison);
        return comparison;
    }

    async login(email, password){
        const user = await this.user.getByEmail(email);
        if(user && await this.comparePassword(password, user.password)){
            const data = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role?user.role: 5
            }

            const token = jwt.sign(data, jwt_secret, {expiresIn:'1d'});
            return {status:true, data, token};
        }

        return {status: false, message: "Las credenciales no coinciden"};
    }

    async signup(dataUser){
        const {email} = dataUser;
        const user = await this.user.getByEmail(email);
        if(user){
            return {status:false, message: "Este usuario ya existe."};
        }else{
            dataUser.password = await this.hashPassword(dataUser.password);
            const newUser = await this.user.create(dataUser);
            const data = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                role: 5
            }
    
            const token = jwt.sign(data, jwt_secret, {expiresIn:'1d'});
            return {status:true, data, token};
        }
    }
}

module.exports = Auth;
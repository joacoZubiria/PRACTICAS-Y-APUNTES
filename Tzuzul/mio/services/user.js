const UserModel = require('../models/user');

class User{
    async get(id){
        try{
            const user = await UserModel.findById(id);
            return user;
        }catch(err){
            return {status: 404, statusText: 'Not-Found'}
        }
    }

    async getByEmail(email){
        const user = await UserModel.findOne({email:email});
        return user;
    }

    async getAll(){
        const users = await UserModel.find();
        return users;
    }

    async create(data){
        const users = await UserModel.create(data);
        return users;
    }

    async update(id, data){
        const user = await UserModel.findByIdAndUpdate(id, data, {new:true});
        return user;
    }

    async delete(id){
        const user = await UserModel.findByIdAndDelete(id);
        return user;
    }
}

module.exports = User;
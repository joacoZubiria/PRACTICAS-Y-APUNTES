const {mongoose} = require('../config/db');

const {Schema} = mongoose;

const user = new Schema({
    firstName: String,
    lastName: String,
    birth: String,
    city: String,
    email: String,
    password: String,
    role: String
});

const UserModel = mongoose.model("users", user);

module.exports = UserModel;
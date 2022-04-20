const mongoose = require('mongoose');
const config = require('./index.js');

const connection = async () => {
    const conn = await mongoose.connect(`mongodb+srv://joaquinkun:RreygMDODCO2xoMg@cluster0.pniv6.mongodb.net/movies?retryWrites=true&w=majority`);
    //const conn = await mongoose.connect(`mongodb+srv://${config.db_username}:${config.db_password}@${config.db_host}/${config.db_name}`);
    console.log('Conexión exitosa DB: ' + conn.connection.host);
};

module.exports = {connection, mongoose}; // llevo mongoose para los models
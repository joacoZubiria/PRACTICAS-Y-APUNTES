const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser');
const passport = require('passport');
const publicDir = `${__dirname}/public`;
const config = require('./config/index.js');
const session = require('express-session');

//Trayendo conexión a DB
const {connection} = require('./config/db.js');
connection();

//Importando routes.
const prueba = require('./routes/index.js');
const movies = require('./routes/movies.js');
const user = require('./routes/user.js');
const auth = require('./routes/auth.js');

//const GoogleStrategy = require('passport-google-oauth20').Strategy

const app = express();

//Middlewares globales.
app.use(express.json());
app.use(express.static(publicDir));
app.use(cors({
    origin:['http://127.0.0.1:5500'],
    credentials:true
}));
app.use(cookies());

// app.use(passport.initialize())
// passport.use(new GoogleStrategy({
//     clientID: config.oauth_client_id,
//     clientSecret: config.oauth_client_secret,
//     callbackURL: config.oauth_callback_url,
//     scope: ['profile']
// }));

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     store: connection()
// }))
//app.use(passport.authenticate('session'))

//Utilizando routes.
prueba(app);
movies(app);
user(app);
auth(app);

app.get('/', (req,res,next) => {
    return res.status(200).sendFile(`index.html`);
})

app.listen(4000, () => {
    console.log('conectado al servidor');
})

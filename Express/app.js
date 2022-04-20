const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    routes = require('./routes/router'),
    faviconURL = `${__dirname}/public/img/node-favicon.png`,
    publicDir = express.static(`${__dirname}/public`), // se tiene que ejecutar el directorio público
    viewsDir = `${__dirname}/views`,
    port = (process.env.PORT || 3000),
    app = express();

app
    // config app
    .set('views', viewsDir)
    .set('view engine', 'ejs')
    .set('port', port)
    // ejecutando middlewares
    .use(favicon(faviconURL))
    .use(publicDir)
    .use(logger('dev'))
    // ejecutando middleware enrutador
    .use('/', routes);

module.exports = app;
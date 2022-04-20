const app = require('./app'),
    server = app.listen(app.get('port'), (req, res) => {
        console.log(`Iniciando en el puerto ${app.get('port')}`);
    });


const express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    publicDir = express.static(`${__dirname}/public`),
    port = process.env.PORT || 5000;

    app
        .use(publicDir)
        .get('/', (req,res,next) => {
            res.sendFile(`${publicDir}/index.html`);
        })

http.listen(port, () => {
    console.log(`Conectado exitosamente al puerto: ${port}`);
});

io.on('connection', socket => {
    console.log('me copnecte')
    socket.broadcast.emit('new user', {message : 'Ha entrado un nuevo usuario!'});
    socket.on('new message', data => {
        io.emit('user says', data);
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('chau', {message : 'Se fue un usuario'})
    } )
})
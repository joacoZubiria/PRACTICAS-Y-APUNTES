const http = require('http').createServer(server),
io = require('socket.io')(http),
fs = require('fs');
let connection = 0;

function server(req,res){
    fs.readFile('index.html', (err, data) => {
        
        if(err) {
            res.writeHead(500, {'Content-Type' : 'text/html'})
            res.end('<h1>Error</h1>');
        }
        
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data, 'utf-8');
    });
};

http.listen(3000);

io.on('connection', socket => {

    socket.emit('hello', {message : 'Hola desde el servidor'})

    socket.on('anashe',  data => console.log(data.message));

    connection++
   
    socket.emit('connect count', {number : connection});
    socket.broadcast.emit('connect count', {number : connection});

    socket.on('disconnect', () => {
        connection--
        console.log(`numero de conexiones activas: ${connection}`)
        socket.broadcast.emit('connect count', {number : connection});
        });
});

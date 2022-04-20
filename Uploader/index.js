const http = require('http');
const fs = require('fs');
const uuid = require('uuid').v4;

http.createServer((req, res) => {    
    if(req.url == '/'){
        fs.readFile(`${__dirname}/public/index.html`, (err, data) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        });
    }

    if(req.url == '/js.js'){
        fs.readFile(`${__dirname}/public/js.js`, (err, data) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type' : 'application/javascript'});
            res.end(data);
        })
    }

    if(req.url == '/enviar' && req.method == 'POST'){
        const fileName = req.headers['file-name'];
        const newFile = fs.createWriteStream(`${__dirname}/uploaded/${uuid()}-${fileName}`);
        req.pipe(newFile);
        
        req.on('end', () =>{
            console.log('listo');
        })
    }

}).listen(3000, () => console.log('yas'));

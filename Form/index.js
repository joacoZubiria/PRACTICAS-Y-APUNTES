const http = require('http');
const fs = require('fs');
const {oAuth2Client, transport} = require('./email.js');

http.createServer((req, res) => {
    if(req.url == '/'){
        fs.readFile(`${__dirname}/public/index.html`, (err, data) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        });
    }

    if(req.url == '/style.css'){
        fs.readFile(`${__dirname}/public/style.css`, (err,data) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type' : 'text/css'});
            res.end(data);
        });
    }

    if(req.url == '/js.js'){
        fs.readFile(`${__dirname}/public/js.js`, (err,data) => {
            if(err) throw err;
            res.writeHead(200, {'Content-Type' : 'text/javascript'});
            res.end(data);
        });
    }


    if(req.url == '/send' && req.method == 'POST'){

        let body = '';
        req.on('data', data=>{
            body += data;

        });
        req.on('end', e => {
            console.log(body)
        })
        // const {nombre, email, asunto, consulta} = req.body

        // async function sendEmail(){
        //     const accesToken = await oAuth2Client.getAccesToken();
        
        //     const result = await transport.sendMail({
        //         from: 'joaquinzubiria <no-replay@gmail.com>',
        //         to: email,
        //         subject: asunto,
        //         text: consulta
        //     });
        //     return result;
        // }

        // sendEmail()
        // .then(response => {
        //     console.log('Email sent...', response)
        //     res.end(response);
        // })
        // .catch(err => console.log(err));
    }  

}).listen(3000, () => console.log('Conectado'));


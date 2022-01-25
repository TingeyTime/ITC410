const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    console.log(req.method + ' ' + req.path);
    req.greet = 'World';
    next();
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello ' + req.greet);
})

app.post('/', (req, res) => {
    console.log('Body: ', req.body);
    res.send('OK');
})

app.listen(3000)
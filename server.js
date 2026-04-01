const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Requisição recebida!")
});

app.get('/home', (req, res) => {
    res.send("Home Page");
});
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Requisição recebida!")
});

app.get('/home', (req, res) => {
    res.send("Home Page");
});


app.listen(1234, () => {
    console.log("Servidor iniciado na porta 1234");
});
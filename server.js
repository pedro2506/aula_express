const express = require('express');
const app = express();

/*app.get('/', (req, res) => {
    res.send("Requisição recebida!")
});

app.get('/home', (req, res) => {
    res.send("Home Page");
});

app.get('/me', (req, res) => {
    const {nome, cidade} = req.query;
    res.send(`Meu nome é ${nome}, Moro em ${cidade}`);
});



app.get('/ME', (req, res) => { --colcar /me/pedro/fortaleza
    const {nome, cidade} = req.query;
    res.send(`Meu nome é ${nome}, moro em ${cidade}`);
})*/

app.get('/ME/:nome/:cidade', (req, res) => { 
    const {nome, cidade} = req.params;
    res.send(`Meu nome é ${nome}, moro em ${cidade}`);
})


app.listen(2000, () => {
    console.log("Servidor iniciado na porta 2000");
});
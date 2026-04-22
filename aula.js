const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Requisição recebida!");
});

app.get('/home', (req, res) => {
    res.send("Home Page");
});

app.get('/me', (req, res) => {
    const {nome, bairro} = req.query;
    res.send(`Meu nome é ${nome}, Moro em ${bairro}`);
});

app.get('/produtos{/*categoria}{/*produto}', (req, res) => {
    const {categoria, produto} = req.params;

    if(categoria && produto) {
        return res.send(`Pagina do produto ${produto}`);
    }

    if (categoria && !produto) {
        return res.send(`Todos os produtos da categoria ${categoria}`);
    }

    return res.send(`Todos os produtos`);
});

app.post('/login', (req, res) => {

    const {email, password} = req.body;

    // vou la no banco de dados pegar o usuario pelo email e senha
    if(email === 'email@email.com' && password === 'senha123') {
        return res.send('Usuario logado com sucesso!')
    }

    return res.send('Login incorreto!');
});

app.get('/content-type', (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    res.setHeader('Cache-control', 'no-store');
    res.send('{"name": "Joselito"}');
});

app.listen(1234, () => {
    console.log("Servidor iniciado na porta 1234");
});
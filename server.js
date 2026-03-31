
const express = require('express');
const app = express();
/*app.use(express.static(path.join(__dirname, 'publico')));
app.get ('/', (req, res) => {
    res.send('Requisição recebida!');
});

app.get('/home', (req, res) => {
    res.send("Home Page");
})

app.get('/ME', (req, res) => { --colcar /me/pedro/fortaleza
    const {nome, cidade} = req.query;
    res.send(`Meu nome é ${nome}, moro em ${cidade}`);
})

app.get('/ME/:nome/:cidade', (req, res) => { 
    const {nome, cidade} = req.params;
    res.send(`Meu nome é ${nome}, moro em ${cidade}`);
})

// rota de diagnóstico para verificar caminhos do servidor
app.get('/_info', (req, res) => {
    res.json({ cwd: process.cwd(), __dirname });
});*/

// A rota deve ser definida ANTES do listen
app.get('/ME/:nome/:cidade', (req, res) => { 
    const { nome, cidade } = req.params;
    res.send(`Meu nome é ${nome}, moro em ${cidade}`);
});

// O listen mantém o processo do Node vivo
app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
});

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
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
    res.send(`<body style="background: #121212; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
            <div style="text-align: center; border: 2px solid #00ff88; padding: 40px; border-radius: 15px; box-shadow: 0 0 20px rgba(0,255,136,0.2);">
                <h1 style="color: #00ff88; margin-bottom: 10px;">Aula Express</h1>
                <p style="font-size: 1.5rem;">Olá, meu nome é <strong>${nome}</strong></p>
                <p style="font-size: 1.5rem; style="color: #00ff88;">Moro em <strong>${cidade}</strong></p>
            </div>
        </body>
    `);
    });

// O listen mantém o processo do Node vivo
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
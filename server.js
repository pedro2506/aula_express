
const express = require('express');
const app = express();

// A rota deve ser definida ANTES do listen
app.get('/ME/:nome/:cidade', (req, res) => { 
    const { nome, cidade } = req.params;
    res.send(`Meu nome é ${nome}, moro em ${cidade}`);
});

// O listen mantém o processo do Node vivo
app.listen(3000, () => {
    console.log("Servidor iniciado na porta 2000");
});
const express = require('express');
const UserRoutes = require('./src/routes/UserRoutes')
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Servidor OK');
});

app.use(UserRoutes);

const PORT = process.env.PORT || 1234;

const server = app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.error(`Porta ${PORT} em uso. Finalize o processo que a usa ou altere a porta.`);
        process.exit(1);
    }
    throw err;
});
const express = require('express');
const UserRoutes = require('./src/routes/UserRoutes')
const app = express();

app.use(express.json());

app.use(UserRoutes);


app.listen(1234, () => {
    console.log("Servidor iniciado na porta 1234");
});
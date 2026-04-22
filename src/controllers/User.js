
/**
 Desafio para casa:

 Criar um rota PUT /users/:id que atualiza os dados de um usuario que 
 já existe.
 
 Regras:
 1. Usuario precisa ter id numerico
 2. No POST o novo usuario deve ser criado com id
 3. No PUT deve ser atualizado apenas os campos envidos no body
 
 Exemplo de fakeUsers com id: [{id: 1, name: "Joselito", email: 'joselito@mail.com'}]
 */

const fakeUsers = [
    { id: 1, name: 'Joselito', email: 'joselito@mail.com' }
];

function ListUser(req, res) {
    return res.status(200).json(fakeUsers);
}

function CreateUser(req, res) {
    const { name, email } = req.body;
    const id = fakeUsers.length ? fakeUsers[fakeUsers.length - 1].id + 1 : 1;
    const newUser = { id, name, email };
    fakeUsers.push(newUser);
    return res.status(201).json(newUser);
}

module.exports = {
    ListUser,
    CreateUser
};
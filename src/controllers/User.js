
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

function UpdateUser(req, res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: 'ID precisa ser numerico' });
    }

    const user = fakeUsers.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ error: 'Usuario nao encontrado' });
    }

    const { name, email } = req.body;
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;

    return res.status(200).json(user);
}

module.exports = {
    ListUser,
    CreateUser,
    UpdateUser
};
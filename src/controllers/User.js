let users = [
  { id: 1, name: "Joselito", email: "joselito@mail.com" }
];

const ListUser = (req, res) => {
  const { id } = req.params;

  if (!id) {
    const lastId = users.length > 0 ? users[users.length - 1].id : 0;
    const nextId = lastId + 1;
    users.push({ id: nextId, name: `Usuario ${nextId}`, email: `usuario${nextId}@mail.com` });
    return res.json(users);
  }

  const numericId = Number(id);
  const user = users.find(u => u.id === numericId);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  return res.json(user);
};

const CreateUser = (req, res) => {
  const { name, email } = req.body;

  const lastId = users.length > 0 ? users[users.length - 1].id : 0;
  const nextId = lastId + 1;

  const newUser = {
    id: nextId,
    name,
    email
  };

  users.push(newUser);

  return res.status(201).json({
    message: "Usuário criado com sucesso!",
    user: newUser
  });
};
const UpdateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID precisa ser numérico" });
  }

  const userExists = users.some(u => u.id === id);
  if (!userExists) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  users.forEach(user => {
    if (user.id === id) {
      user.name = name || user.name;
      user.email = email || user.email;
    }
  });

  return res.json({ message: "Usuário atualizado com sucesso!" });
};

const DeleteUser = (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  users.splice(userIndex, 1);
  return res.json({ message: "Usuário removido com sucesso!", listaAtualizada: users });
};

module.exports = { ListUser, CreateUser, UpdateUser, DeleteUser };
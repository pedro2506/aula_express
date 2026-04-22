let users = [
  { id: 1, name: "Joselito", email: "joselito@mail.com" }
];

const ListUser = (req, res) => {
  return res.json(users);
};

const CreateUser = (req, res) => {
  const { id, name, email } = req.body;

  if (typeof id !== "number") {
    return res.status(400).json({ error: "ID precisa ser numérico" });
  }

  users.push({ id, name, email });

  return res.status(201).json(users);
};

const UpdateUser = (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID precisa ser numérico" });
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  // Atualiza só os campos enviados
  Object.keys(req.body).forEach(key => {
    user[key] = req.body[key];
  });

  return res.json(user);
};

module.exports = {
  ListUser,
  CreateUser,
  UpdateUser
};
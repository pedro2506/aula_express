let users = [
  { id: 1, name: "Joselito", email: "joselito@mail.com" }
];


const ListUser = (req, res) => {
  const activeUsers = users.filter(user => !user.is_deleted);

  return res.json(activeUsers);
};

const ListDeletedUsers = (req, res) => {
  const deletedUsers = users.filter(user => user.is_deleted);

  return res.json(deletedUsers);
};

function CreateUser(req, res) {
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
}


const UpdateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  const user = users.find(u => u.id === id && !u.is_deleted);

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado"
    });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  return res.json({
    message: "Usuário atualizado com sucesso!",
    user
  });
};


const DeleteUser = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado"
    });
  }

  users = users.filter(u => u.id !== id);

  return res.json({
    message: "Usuário deletado permanentemente"
  });
};


const SoftDeleteUser = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "Usuário não encontrado"
    });
  }

  user.is_deleted = true;
  user.deleted_at = new Date();

  return res.json({
    message: "Usuário removido logicamente"
  });
};

module.exports = {
  ListUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
  SoftDeleteUser,
};
const express = require('express');
const router = express.Router();

// Fake database
let users = [
  { id: 1, name: "Joselito", email: "joselito@mail.com" }
];

// POST - criar usuário com ID
router.post('/users', (req, res) => {
  const { id, name, email } = req.body;

  if (typeof id !== 'number') {
    return res.status(400).json({ error: 'ID precisa ser numérico' });
  }

  users.push({ id, name, email });

  return res.status(201).json(users);
});

// PUT - atualizar usuário existente
router.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID precisa ser numérico' });
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  // Atualiza apenas os campos enviados
  Object.keys(req.body).forEach(key => {
    user[key] = req.body[key];
  });

  return res.json(user);
});

module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../store/user.store');

const JWT_SECRET = /*process.env.JWT_SECRET*/ "rHighT2Zs!9x@vD";

const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  if (users.findByUsername(username)) {
    return res.status(409).json({ error: 'User exists' });
  }

  users.create({ username, password, role });
  res.status(201).send();
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.findByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

module.exports = router;

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const users = [];

function create({ username, password, role }) {
  const hash = bcrypt.hashSync(password, 10);

  const user = {
    id: crypto.randomUUID(),
    username,
    password: hash,
    role
  };

  users.push(user);
  return user;
}

function findByUsername(username) {
  return users.find(u => u.username === username);
}

module.exports = {
  create,
  findByUsername
};

const crypto = require("crypto");

const products = [];

function create({ name, qty, amount }) {
    const now = new Date().toISOString();

    const product = {
        id: crypto.randomUUID(),
        name,
        qty,
        amount,
        createAt: now,
        updateAt: now
    };
    products.push(product);
    return product;
}

function findAll() {
    return products;
}

function findById(id) {
    return products.find(product => product.id === id);
}

function update(id, data) {
  const product = findById(id);
  if (!product) return null;

  if (data.name !== undefined) product.name = data.name;
  if (data.qty !== undefined) product.qty = data.qty;
  if (data.amount !== undefined) product.amount = data.amount;

  product.updatedAt = new Date().toISOString();
  return product;
}

function remove(id) {
    const index = products.findIndex(product => product.id === id);

    if (index === -1) return false;
    products.splice(index, 1);
    return true;
}

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};
const express = require('express');
const store = require('../store/product.store');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticate);

router.get('/', (_req, res) => {
  res.json(store.findAll());
});

router.get('/:id', (req, res) => {
  const product = store.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

router.post('/', authorize('admin'), (req, res) => {
  const { name, qty, amount } = req.body;
  if (!name || typeof qty !== 'number' || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  res.status(201).json(store.create({ name, qty, amount }));
});

router.put('/:id', authorize('admin'), (req, res) => {
  const product = store.update(req.params.id, req.body);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

router.delete('/:id', authorize('admin'), (req, res) => {
  if (!store.remove(req.params.id)) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(204).send();
});

module.exports = router;
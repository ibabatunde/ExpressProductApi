const express = require("express");
const store = require("../store/product.store")

const router = express.Router();

router.post("/", (req, res) => { 
    const { name, qty, amount } = req.body;

    if (!name || typeof qty != "number" || typeof amount != "number") {
        return res.status(400).json({ error: "Invalid payload" });
    }

    const product = store.create({ name, qty, amount });
    res.status(201).json(product);
});

router.get("/", (_req, res) => {
    res.json(store.findAll());
});

router.get("/:id", (req, res) => { 
    const product = store.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ error: "Product not found!" });
    }
    return res.json(product);
});

router.put("/:id", (req, res) => {
  const { name, qty, amount } = req.body;
  if (
    (qty !== undefined && typeof qty !== "number") ||
    (amount !== undefined && typeof amount !== "number")
  ) {
    return res.status(400).json({ error: "Invalid payload" });
  }
  const product = store.update(req.params.id, { name, qty, amount });
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

router.delete("/:id", (req, res) => {
  const deleted = store.remove(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(204).send();
});

module.exports = router;
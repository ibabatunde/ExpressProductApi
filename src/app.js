const express = require("express");
const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes")

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use('/products', productRoutes);

module.exports = app;
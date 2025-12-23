const app = require('./app');

const PORT = 6000;
app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
const express = require('express');
const app = express();
app.use(express.json());
app.use('/orders', require('./routes/orders'));
app.use(require('./middleware/errorHandler'));
module.exports = app;
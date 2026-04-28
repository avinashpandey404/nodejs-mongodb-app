const express = require('express');
const connectDB = require('./db');
const { PORT } = require('./config');

const app = express();

app.use(express.json());

app.use('/api/items', require('./routes/itemRoutes'));

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/ready', (req, res) => {
  const mongoose = require('mongoose');
  res.json({ db: mongoose.connection.readyState === 1 ? 'UP' : 'DOWN' });
});

app.use(require('./middleware/notFound'));
app.use(require('./middleware/errorHandler'));

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log('Server running'));
};

start();

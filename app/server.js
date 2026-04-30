const express = require('express');
const connectDB = require('./db');
require('dotenv').config();

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

// Health
app.get('/health', (req, res) => res.json({ status: 'UP' }));

// Error handling
app.use(require('./middleware/notFound'));
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('DB connection failed', err);
  }
};

start();

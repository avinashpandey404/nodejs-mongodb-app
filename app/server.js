const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./db');
const { PORT } = require('./config');

// Routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Middleware
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ========================
// Middleware
// ========================
app.use(express.json());

// ========================
// Health Check Routes
// ========================
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/ready', (req, res) => {
  res.json({
    db: mongoose.connection.readyState === 1 ? 'UP' : 'DOWN'
  });
});

// ========================
// API Routes
// ========================
app.use('/api/auth', authRoutes);   // ✅ YOUR REQUESTED ADDITION
app.use('/api/items', itemRoutes);

// ========================
// Error Handling
// ========================
app.use(notFound);
app.use(errorHandler);

// ========================
// Start Server
// ========================
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

start();

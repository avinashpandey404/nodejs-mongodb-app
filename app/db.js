const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB Connected');
      return;
    } catch (err) {
      console.log('Retrying DB...');
      retries--;
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  process.exit(1);
};

module.exports = connectDB;

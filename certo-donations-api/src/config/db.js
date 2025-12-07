const mongoose = require('mongoose');

async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI não definido no arquivo .env');
    }
    
    await mongoose.connect(uri);
    console.log('✓ MongoDB conectado com sucesso');
    return mongoose.connection;
  } catch (err) {
    console.error('✗ Erro na conexão MongoDB:', err.message);
    throw err;
  }
}

module.exports = connectDB;
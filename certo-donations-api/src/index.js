require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const donationRoutes = require('./routes/donationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/donations', donationRoutes);
app.use('/api/payments', paymentRoutes);

// Servir frontend
app.use(express.static(path.join(__dirname, '..', '..')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'certo_website_index.html'));
});

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log(`✓ Server rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('✗ Erro ao iniciar:', err.message);
    process.exit(1);
  }
})();
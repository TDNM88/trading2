const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const copyTradingRoutes = require('./routes/copyTrading');
const tradingBotRoutes = require('./routes/tradingBot');
const bitgetEarnRoutes = require('./routes/bitgetEarn');
const marketInsightsRoutes = require('./routes/marketInsights');
const cryptoPaymentRoutes = require('./routes/cryptoPayment');
const tradingAcademyRoutes = require('./routes/tradingAcademy');
const marketDataRoutes = require('./routes/marketData');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/copy-trading', copyTradingRoutes);
app.use('/api/trading-bot', tradingBotRoutes);
app.use('/api/earn', bitgetEarnRoutes);
app.use('/api/insights', marketInsightsRoutes);
app.use('/api/payments', cryptoPaymentRoutes);
app.use('/api/academy', tradingAcademyRoutes);
app.use('/api/market', marketDataRoutes);

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Trading App API Server' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

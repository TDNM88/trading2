const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth'); // Ensure this path is correct
const adminRoutes = require('./routes/adminRoutes');
const app = express();
app.use(cors());
app.use(express.json());

// Define a root route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log("Server started on port 5000")))
  .catch(err => console.log(err));

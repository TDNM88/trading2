const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const blogRoutes = require('./routes/blogRoutes'); 
const authRoutes = require('./routes/auth'); 
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const app = express();
app.use(cors());
app.use(express.json());

// Root test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// ✅ FIXED THIS LINE
app.use('/api/users', userRoutes);

app.use('/api/news', newsRoutes);


app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// DB Connection + Start Server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log("Server started on port 5000")))
  .catch(err => console.log(err));

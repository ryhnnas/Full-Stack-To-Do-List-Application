const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const {connectDb} = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing body JSON

// Koneksi ke Database
connectDb();

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('To-Do List API is running!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
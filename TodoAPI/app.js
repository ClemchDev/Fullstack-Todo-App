const express = require('express');
const mongoose = require('mongoose')

const app = express();

const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');

mongoose.connect('YOUR MONGODB CONNECTION TOKEN',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB !'))
  .catch(() => console.log('Error to connect to MongoDB !'));

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);
app.use('/api/auth', todoRoutes);

module.exports = app;
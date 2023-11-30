require('dotenv').config();

// Include express 
const express = require('express');
const app = express();

// Include Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);

// Check for successful connection
const db = mongoose.connection;
db.on('error', (error) => console.log(error.message));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
const routers = require('./routers/router');
const path = require('path');
app.use(routers);

app.listen(3000, () => { console.log('Connected to Server') });

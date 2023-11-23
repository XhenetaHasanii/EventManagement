require('dotenv').config();
// include express
const express = require('express');
const app = express();

//include mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.log(error.message));
db.once('open', () => console.log('Connected to Database'));

app.listen(3000, () => console.log('Connected to Server'));


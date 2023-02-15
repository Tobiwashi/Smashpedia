//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()

//Port
const PORT = process.env.PORT || 3003;

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo & Fix Depreciation Warnings from Mongoose //
mongoose.connect(MONGODB_URI);

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('Mongo Connection Established: ', MONGODB_URI));
db.on('disconnected', () => console.log('Mongo Connection Terminated'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/' , (req, res) => {
    res.send('Hello World!');
  });

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
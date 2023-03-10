//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const axios = require('axios')
const app = express ();
const db = mongoose.connection;
const characterSchema = require('./models/characterSchema')
const allCharacters = require('./models/roster')
require('dotenv').config()
const cors = require("cors")

//Port
const PORT = process.env.PORT || '8080';

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo & Fix Depreciation Warnings from Mongoose //
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI);



db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('Mongo Connection Established: ', MONGODB_URI));
db.on('disconnected', () => console.log('Mongo Connection Terminated'));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


app.get('/', (req, res) =>{
    characterSchema.find({},(err, allCharacters) =>{
        res.render('index.ejs', {allCharacters})
    })

app.get('/add', (req,res)=>{
        res.render('add.ejs')
    }) 

app.post('/add', (req, res)=>{
        characterSchema.create(req.body, (error, createdCharacter)=>{
            res.render('/')
        });
    }); 

app.get('/:id', (req,res) =>{
        characterSchema.findById(req.params.id, (err,character)=>{
            res.render('show.ejs',{character})
        })
    })
}) 

app.get('/edit/:id', (req,res) =>{
    characterSchema.findById(req.params.id, (err,character)=>{
        res.render('edit.ejs',{character})
    })
})

app.put('/edit/:id' , (req,res)=>{
    characterSchema.findByIdAndUpdate(req.params.id, req.body, {new:true},(err,character)=>{
        res.redirect('/')
    })
})
app .delete('/delete/:id' ,(req,res) =>{
    characterSchema.findByIdAndRemove(req.params.id, (err,character)=>{
        res.redirect('/')
    })
})


app.listen(PORT, () => console.log( 'Listening on port:', PORT));

// characterSchema.create(allCharacters, (err, items)=> {
//     console.log(items)
// })
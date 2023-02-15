//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const characterSchema = require('./models/characterSchema')
const allCharacters = require('./models/roster')
require('dotenv').config()
const cors = require("cors")

//Port
const PORT = process.env.PORT || 3003;

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo & Fix Depreciation Warnings from Mongoose //
mongoose.connect(MONGODB_URI);

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('Mongo Connection Established: ', MONGODB_URI));
db.on('disconnected', () => console.log('Mongo Connection Terminated'));

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('https://smashpedia.herokuapp.com/', (req, res) =>{
    characterSchema.find({},(err, allCharacters) =>{
        res.render('index.ejs', {allCharacters})
    })

app.get('https://smashpedia.herokuapp.com/add', (req,res)=>{
        res.render('add.ejs')
    }) 

app.post('https://smashpedia.herokuapp.com/add', (req, res)=>{
        characterSchema.create(req.body, (error, createdCharacter)=>{
            res.redirect('/')
        });
    }); 

app.get('https://smashpedia.herokuapp.com/:id', (req,res) =>{
        characterSchema.findById(req.params.id, (err,character)=>{
            res.render('show.ejs',{character})
        })
    })
}) 

app.get('https://smashpedia.herokuapp.com/edit/:id', (req,res) =>{
    characterSchema.findById(req.params.id, (err,character)=>{
        res.render('edit.ejs',{character})
    })
})

app.put('https://smashpedia.herokuapp.com/edit/:id' , (req,res)=>{
    characterSchema.findByIdAndUpdate(req.params.id, req.body, {new:true},(err,character)=>{
        res.redirect('/')
    })
})
app .delete('https://smashpedia.herokuapp.com/delete/:id' ,(req,res) =>{
    characterSchema.findByIdAndRemove(req.params.id, (err,character)=>{
        res.redirect('/')
    })
})


app.listen(PORT, () => console.log( 'Listening on port:', PORT));

// characterSchema.create(allCharacters, (err, items)=> {
//     console.log(items)
// })
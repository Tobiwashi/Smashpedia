//Dependencies//
const mongoose = require('mongoose')

//Schema//
const characterSchema = new mongoose.Schema({
    name:{type: String, required: true},
    fighter: String,
    series: String, 
    image: String,
    logo: String,
    trailer: String,
    background: String,   
})

//Product Collection Creator//
const characterCollection =mongoose.model('Character', characterSchema)
module.exports= characterCollection
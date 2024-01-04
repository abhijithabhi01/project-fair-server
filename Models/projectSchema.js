//import mongoose
const mongoose = require('mongoose')

//create schema to define the structure of collection documents
const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        
    },
    language:{
        type:String,
        required:true,

    },
    overview:{
        type:String,
        required:true
    },
    github:{
        type:String,
        require:true

    },
    website:{
        type:String,
        require:true
    },
    projectImage:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }

})

//model
const projects = mongoose.model("projects",projectSchema)

//export model
module.exports = projects
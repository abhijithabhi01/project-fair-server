//import mongoose
const mongoose = require('mongoose')

//import validator for email 
const validator = require('validator')

//create schema to define the structure of collection documents
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:[3, 'Must be atleast 3 , got {value}']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }

    },
    password:{
        type:String,
        required:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }

})

//model
const users = mongoose.model("users",userSchema)

//export model
module.exports = users
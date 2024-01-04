//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
//Environment variables provide information about the environment in which the process is running. 
require('dotenv').config()
//import express
const express = require('express')

//import cors
const cors = require('cors')

//import router
const router = require('./Routes/router')
const appMiddleware = require('./middlewares/appMiddleware')

//import mongoose
require('./DB/connections')

//create expressServer -Creates an Express application. The express() function is a top-level function exported by the express module.

const pfServer = express()
//cors is used by server
pfServer.use(cors())
//parsing json -Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.(CONTENT-TYPE - APLLICATION/JSON) - convert into javaScript understanding object
pfServer.use(express.json())

//middleware appmiddleware - only me
/* pfServer.use(appMiddleware) */

//use router in server
pfServer.use(router)

//export uploads
//first arg - how other apllication should use it 
//second argument - to export that file from server
pfServer.use('/uploads',express.static('./uploads'))

//customize port- bydefault - 3000

const PORT = 4000 || process.env.PORT

//run server app
pfServer.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

//http get request resolving to http://localhost:4000/ 
pfServer.get('/',(req,res)=>{
    res.send(`<h1 style="color:green;">Project server started and waiting fro client server !! </h1>`)
})

/* //post request
pfServer.post('/',(req,res)=>{
   res.send("post requested")
})

//put request
pfServer.put('/',(req,res)=>{
    res.send("put requested")
 }) */  
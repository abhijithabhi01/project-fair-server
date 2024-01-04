//import mongoose
const mongoose = require('mongoose')
//get the connection string of mongodb
const connectionString = process.env.DATABASE

//establish connection
mongoose.connect(connectionString).then(()=>{
   console.log('Mongodb connected with PF-Server'); 
}).catch((err)=>{
    console.log('Mongodb connection failed due to'+err); 
})
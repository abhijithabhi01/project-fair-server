//to verify the token -we need the same library
//import jwt library
const jwt = require('jsonwebtoken')
//this middleware have to be placed in the routing file in the add project path before giving control to controller
const jwtMiddleware = (req,res,next)=>{
 console.log('inside the jwt middleware');
 // should be small letterauthorization
 //we need to separate the bearer and the token which is separated by the single space .so it is splited based on the space .this will return an array . token will be presnt in the first index and second position.
 const token = req.headers['authorization'].split(' ')[1]
 console.log(token);
 //verify the token
   try {   const jwtResponse = jwt.verify(token,"supersecretkey12345")
        console.log(jwtResponse);//returns the userId and iat{ userId: '657266a125c377f46f6031e3', iat: 1702342367 }
        req.payload = jwtResponse.userId
        next() 
    }catch(err){
        res.status(401).json('Authorization failed ....Please Login')
      }
 
}

//export  the module
module.exports = jwtMiddleware

//two type of middleware 
//1)eouter specific middleware - applicable only in the specific routes not available in the entire project.
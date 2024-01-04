//only for me
const appMiddleware = (req,res,next)=>{
    console.log("inside application specific middleware");// do this much and add the middleware in the index.js and the send the addproject request . it will show sending the request continously but in terminal it show the inside the appmiddleware----that means the middleware have the potiential to control the request . now give the next then check again
    next() //now  the control first go to the middleware then it move to the controller

}
module.exports = appMiddleware
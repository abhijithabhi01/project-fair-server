//import model
const users = require('../Models/userSchema')
//import json web token
const jwt = require('jsonwebtoken')

//logic to resolve register
exports.register = async (req, res) => {
    //logic
    console.log('inside register controller function');
    //destructuring the keys from the req body(the json is parsed and converted into javaScript object)
    const { username, email, password } = req.body
    console.log(username, email, password);
    // its a call to the mongodb hosted in internet in another port/url from the server hosted in 4000 - hence it is a asynchromous function so use asyn-await // emailinscheme : email in reqbody so one email
    try {
        const existingUser = await users.findOne({ email }) //return two response - document if presenr else null
        if (existingUser) {
            //if the document is present the response - status 409- unprocessible entity
            res.status(406).json("Account already Exist !! please login..")
        } else {
            //if null is returned response
            //create an object for the model since only those value satifying the schema should only store in the db
            const newUser = new users({
                username,
                email,
                password,
                github: "",
                linkedin: "",
                profile: ""
            })
            //save method in mongoose add the value into mongodb
            await newUser.save()
            //response
            /* res.status(200).json("Register Request received") */
            res.status(200).json(newUser)//sending the registered user details as response
            //asynchronous may get reponse or not if the response is not received the application should not stop
            //the runtime error is solved by javaScript using try and catch block. 
            //so place all the content that may result in error in try block and remaining in catch block

        }
    }catch(err){
        //always  set 401 in the catch block-- error is prent in the try block
       res.status(401).json(`Register API Failed, ERROR : ${err}`)
    }

} 

//logic to resolve login
exports.login = async(req,res)=>{
    console.log('inside login function');

    const {email,password}= req.body
    try{
        const existingUser = await users.findOne({email,password})
        console.log(existingUser);
        if(existingUser){
            //eligible to login
            //sign is the method to generate token , payload is the first argument indicate which data you need to store in the token
            const token = jwt.sign({userId:existingUser._id},"supersecretkey12345")
            res.status(200).json({
                existingUser,//if a existingUser exists the entire document is returned.
                token
            }) 

        }else{
            res.status(404).json(`Incorrect Email/Password`) 
        }
    }catch(err){
       //always  set 401 in the catch block - error is prent in the try block
       res.status(401).json(`login API Failed, ERROR : ${err}`) 
    }

}


//edit profile
exports.editUser = async(req,res)=>{
    const userId=req.payload
    const{username,email,password,github,linkedin,profile} = req.body
console.log({username,email,password,github,linkedin,profile});
    const profileImage = req.file?req.file.filename:profile

    try{

        const updateUser =await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkedin,profile:profileImage},{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)
       
    }catch(err){
        res.status(401).json(err)
    }
}
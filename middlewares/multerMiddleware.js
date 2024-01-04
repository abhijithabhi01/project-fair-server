//import Multer

const multer = require('multer')

//stoarge this extrenal file inside the server
const storage = multer.diskStorage({
    // Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
    destination:(req,file,callback)=>{
        callback(null,'./uploads') // it should be stored in uploads folder
    },
    filename:(req,file,callback)=>{
        //file name will be image-number-name of the file uploaded
        //Date.now() - give a millisec time from the date object
        // multer will store the file in file object.the name of the file will be store in the originalname key
      const filename = `image-${Date.now()}-${file.originalname}`
      //to set the name
      callback(null,filename)
    }
})

//instead of images they may upload pdf etc...inorder to prevent that
const fileFilter = (req,file,callback)=>{
    //mimetype - used to get the type
    if(file.mimetype === 'image/png' || file.mimetype ==='image/jpeg' || file.mimetype === 'image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("Only png,jpg,jpeg files are allowed !!"))
    }
}

const multerConfig  = multer({
    storage,
    fileFilter
})

module.exports = multerConfig
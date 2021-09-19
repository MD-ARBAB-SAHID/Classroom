const multer = require("multer");
const { v1: uuId } = require('uuid');

const MIME_TYPE = {
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg'
}
const imageGetter = multer({
    
    limits:500000,
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
        
                cb(null,"uploads/images")
       
        },
        filename:(req,file,cb)=>{
            const extention = MIME_TYPE[file.mimetype];
            cb(null,uuId()+"."+extention);
        }
    }),
    fileFilter:(req,file,cb)=>{
       
        const isValid = !!MIME_TYPE[file.mimetype];
        
        const error = isValid ? null : new Error("Invalid Image")
        cb(error,isValid);
    }
})

module.exports = imageGetter;
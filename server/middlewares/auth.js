const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const  dotenv= require("dotenv")
const path = require("path")
dotenv.config({path:path.join(__dirname,"../",".env")});
const auth = (req,res,next)=>{
    if(req.method==="OPTIONS"){
        return next();
    };

    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token)
      {
        return next(new HttpError("Authorization failed",402));
      }  else{
     
            const decodedToken = jwt.verify(token,process.env.JWT_KEY);
            req.userData = {
                userId:decodedToken.id
            }
            next(); 
    }
}catch(err){
        return next(new HttpError("Auth failed",402));
      };
 
  
}

module.exports = auth;

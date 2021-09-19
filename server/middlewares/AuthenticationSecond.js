const HttpError = require("../models/http-error");
const Student =    require("../models/student-model");

const AuthenticationSecond = async (req,res,next)=>{
  
    const {studentId} = req.params;
    const tokenUserId = req.userData.userId

    let existingUser;

    if(!( tokenUserId=== studentId))
    {  
        return next(new HttpError("Authorization failed",402));
    }

    try{
        existingUser = await Student.findById(tokenUserId);
   }catch(err)
   {
       return next(new HttpError("Authorization failed",402));
   };
   if(!existingUser)
   {
       return next(new HttpError("Authorization failed",402));
   }

   req.existingUser = existingUser;

   next();

}

module.exports = AuthenticationSecond;
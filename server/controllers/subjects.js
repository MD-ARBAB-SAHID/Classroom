const HttpError = require("../models/http-error");
const Student =    require("../models/student-model");
const helper = require("./helper");
const {validationResult} = require("express-validator");


const getAllSubjects = async(req,res,next)=>{
    
  
    let existingUser = req.existingUser;

    const subjects = [...existingUser.subjects]
  
    const helperData = helper(subjects);
  

   
    
    res.json({subjects:helperData,name:existingUser.name});
    

    
}


const addSubjects = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {  
        return next(new HttpError("Invalid Inputs.Please fill the form correctly ",406));
    }
    let existingUser=req.existingUser;

    
   const userSubjects = existingUser.subjects;
   const subName = req.body.name;

   const isValidSubject = userSubjects.some((element)=>{
       return (subName.toLowerCase())===(element.subjectName.toLowerCase());
   })

   if(isValidSubject)
   {
       return next(new HttpError("Subject exists.Try adding different subject",406))
   };

   const subject = {
       subjectName:subName,
       attendance:[]
   }
  
    
   try{
       existingUser.subjects = [...userSubjects,subject];
        existingUser=await existingUser.save();
   }catch(err)
   {
       return next(new HttpError("Could not add subject,Try again",500));
   };

   const helperData = helper(existingUser.subjects);

   res.json({subjects:helperData});

   

    

}

const addAttendance = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {  
        return next(new HttpError("Invalid Inputs.Please fill the form correctly ",406));
    }
    const {date,attendanceType} = req.body;

    const subjectId  = req.params.subjectId;
    if(!((attendanceType==="ATTENDED") || (attendanceType==="UNATTENDED") || (attendanceType==="CANCELLED")))
    {
        return next(new HttpError("Invalid Inputs.Please fill the form correctly ",406));
    }

   

    let existingUser = req.existingUser;

   const foundSubjectIndex = existingUser.subjects.findIndex((element)=>{
    return element._id.toString()===subjectId;
   })

   if(foundSubjectIndex===-1)
   {
       return next(new HttpError("Subject Not Found ",406));
   };

   const attendanceList = existingUser.subjects[foundSubjectIndex].attendance;

   let isDateExist = attendanceList.some((element)=>{
       return element.date===date.toLocaleDateString();
   })
   if(isDateExist)
   {
       return next(new HttpError("Attendance exist for the entered date",406));
   }
   const newAttendance = {
    attendanceType:attendanceType,
    date:date.toLocaleDateString()
   }
   existingUser.subjects[foundSubjectIndex].attendance = [...attendanceList,newAttendance];

   try{
       existingUser = await existingUser.save();
   }catch(err)
   {    console.log(err);
       return next(new HttpError("Cannot Add Attendance,Try Again",500));
   };

   const helperData = helper(existingUser.subjects);
  

   
    
   res.json({subjects:helperData});

   

}





const deleteSubject = async (req,res,next)=>{
   
    const subjectId  = req.params.subjectId
    let existingUser = req.existingUser;

    
   const foundSubject = existingUser.subjects.find((element)=>{
    return element._id.toString()===subjectId;
   })

   if(!foundSubject)
   {
       return next(new HttpError("Subject Not Found ",406));
   };

   existingUser.subjects = existingUser.subjects.filter((element)=>{
    return element._id.toString()!==subjectId;
   })

   try{
    existingUser = await existingUser.save();
}catch(err)
{    console.log(err);
    return next(new HttpError("Cannot Delete Subject,Try Again",500));
};

const helperData = helper(existingUser.subjects);



 
res.json({subjects:helperData});


 

}


const deleteAttendance = async (req,res,next)=>{
    const {attendanceId} = req.params;
    const {subjectId} = req.body;
    let existingUser = req.existingUser;

    const foundSubjectIndex = existingUser.subjects.findIndex((element)=>{
        return element._id.toString()===subjectId;
       })
    
       if(foundSubjectIndex===-1)
       {
           return next(new HttpError("Subject Not Found ",406));
       };

       const attendanceList = existingUser.subjects[foundSubjectIndex].attendance;

    const attendanceToBeDeleted = attendanceList.find((element)=>{
        return (element._id.toString()===attendanceId);
    })

    if(!attendanceToBeDeleted)
    {
        return next(new HttpError("Attendance not found ",406));
    }

const newAttendanceList = attendanceList.filter((element)=>{
    return (element._id.toString()!==attendanceId);
})


existingUser.subjects[foundSubjectIndex].attendance = newAttendanceList;

try{
    existingUser = await existingUser.save();
}catch(err)
{
    return next(new HttpError("Selected Attendance could not be deleted.Try Again",500));
}
const helperData = helper(existingUser.subjects);



 
res.json({subjects:helperData});

       

}


const updateAttendance = async (req,res,next)=>{
    const {subjectId,attendanceType} = req.body;
    const {attendanceId} = req.params;
    let existingUser = req.existingUser;
    if(!((attendanceType==="ATTENDED") || (attendanceType==="UNATTENDED") || (attendanceType==="CANCELLED")))
    {
        return next(new HttpError("Invalid Inputs.Please fill the form correctly ",406));
    }
    

    const foundSubjectIndex = existingUser.subjects.findIndex((element)=>{
        return element._id.toString()===subjectId;
       })
    
       if(foundSubjectIndex===-1)
       {
           return next(new HttpError("Subject Not Found ",406));
       };

       const attendanceList = existingUser.subjects[foundSubjectIndex].attendance;

       const attendanceToBeUpdatedIndex = attendanceList.findIndex((element)=>{
           return (element._id.toString()===attendanceId);
       })
   
       if(attendanceToBeUpdatedIndex===-1)
       {
           return next(new HttpError("Attendance not found,so could not update attendance",406));
       }

       existingUser.subjects[foundSubjectIndex].attendance[attendanceToBeUpdatedIndex].attendanceType = attendanceType;


       try{
           existingUser = await existingUser.save();
       }catch(err)
       {
           return next(new HttpError("Could not update selected attendance,try again later",500));
       }
       const helperData = helper(existingUser.subjects);

 
       res.json({subjects:helperData});
       

}

module.exports.addSubjects = addSubjects;
module.exports.getAllSubjects = getAllSubjects;
module.exports.addAttendance = addAttendance;
module.exports.deleteSubject = deleteSubject;
module.exports.deleteAttendance = deleteAttendance;
module.exports.updateAttendance = updateAttendance;
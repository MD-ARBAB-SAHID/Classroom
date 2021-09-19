const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
    attendanceType:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})
const subjectSchema = new mongoose.Schema({
    subjectName:{
        type:String,
        require:true
    },
    attendance:{
        type:[attendanceSchema],
        required:true
    }

})


const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true,
        
    },
    subjects:[subjectSchema]
    
})

const studentModel = new mongoose.model('student',studentSchema);


module.exports =  studentModel;
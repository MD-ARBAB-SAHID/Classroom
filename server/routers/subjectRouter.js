const express = require("express");
const Router = express.Router();
const Subjects = require("../controllers/subjects"); 
const authMiddlerware  =require("../middlewares/auth");
const AuthenticationFirst = require("../middlewares/AuthenticationFirst");
const AuthenticationSecond = require("../middlewares/AuthenticationSecond");
const { body ,check} = require("express-validator");


Router.use(authMiddlerware);

Router.get("/:studentId",AuthenticationSecond,Subjects.getAllSubjects);
Router.post("/:studentId/addSubject",AuthenticationSecond,body("name").notEmpty(),Subjects.addSubjects);

Router.post("/:subjectId/addAttendance",AuthenticationFirst,check('date').isISO8601().toDate(),Subjects.addAttendance);
Router.delete("/deleteAttendance/:attendanceId",AuthenticationFirst,Subjects.deleteAttendance);
Router.delete("/deleteSubject/:subjectId",AuthenticationFirst,Subjects.deleteSubject);
Router.patch("/updateAttendance/:attendanceId",AuthenticationFirst,Subjects.updateAttendance);



module.exports = Router;
const express = require("express");
const router = express.Router();
const {createStudent, loginStudent, getStudentDetail, updateStudent, registerStudent} = require("../controller/authStudent");
const {createTeacher, loginTeacher, getTeacherDetail, updateTeacher, registerTeacher} = require("../controller/authTeacher");
const fetchUser  = require("../middleware/fetchUser");


// To do : check the id of admin while creating user
router.route("/student").post(createStudent).get(fetchUser, getStudentDetail).put(updateStudent);
router.route("/student/login").post(loginStudent);
router.route("/student/register").post(registerStudent);



router.route("/teacher").post(createTeacher).get(fetchUser, getTeacherDetail).put(updateTeacher);
router.route("/teacher/login").post(loginTeacher);
router.route("/teacher/register").post(registerTeacher);

/*
student-newAccount
student-login
getUserData

teacher-newAccount
teacher-login
*/


module.exports = router;
const express = require("express");
const router = express.Router();
const {createStudent, loginStudent, getStudentDetail, updateStudent, registerStudent} = require("../controller/authenticate");
const fetchUser  = require("../middleware/fetchUser");


// To do : check the id of admin while creating user
router.route("/student").post(createStudent).get(fetchUser, getStudentDetail).put(updateStudent);
router.route("/student/login").post(loginStudent);
router.route("/student/register").post(registerStudent);


/*
student-newAccount
student-login
getUserData

teacher-newAccount
teacher-login
*/


module.exports = router;
const express = require("express");
const router = express.Router();
const {createStudent, loginStudent, getStudentDetail, updateStudent, registerStudent} = require("../controler/authenticate")

// To do : check the id of admin while creating user
router.route("/student").post(createStudent).get(getStudentDetail).put(updateStudent);
router.route("/student/login").post(loginStudent);
router.route("/student/register").post(registerStudent);



/*
student-newAccount
student-login
getUserData

teacher-newAccount
teacher-login
getUserData



*/


module.exports = router;
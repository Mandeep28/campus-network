const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const { customErrorHandler } = require("../error/customError");

// JWT secret string
let JWT_SECRET = process.env.JWT_SECRET_STRING;






//Create a student 

const createStudent = async (req, res, next) => {

  // To do : check if admin id is correct or not

  const { email, currentRollNo } = req.body;

  var findStudent = await Student.findOne({ currentRollNo: currentRollNo });
  if (findStudent) {
    return next(customErrorHandler("Duplicate roll number not allowed", 401));
  }
  findStudent = await Student.findOne({ email: email });
  if (findStudent) {
    return next(customErrorHandler("Duplicate email not allowed", 401));
  }

  const salt = bcrypt.genSaltSync(10);
  const SecPass = bcrypt.hashSync(req.body.password, salt);

  const student = await Student.create({
    email: req.body.email,
    currentRollNo: req.body.currentRollNo,
    password: SecPass,
  });

  res.status(200).json({ msg: "Student Account Created", student });

};






//Login student 

const loginStudent = async (req, res, next) => {
  const { email, password } = req.body;
  let findStudent = await Student.findOne({ email });
  if (!findStudent) {
    return next(
      customErrorHandler("Please provide the correct credentials", 401)
    );
  }


  const passwordChecked = await bcrypt.compareSync(password, user.password);

  if (!passwordChecked) {
    return next(
      customErrorHandler("Please Login With correct Creditials", 401)
    );
  }

  const data = {
    user: {
      id: findStudent.id,
    }
  };

  // jwt auth token

  const token = jwt.sign(data, JWT_SECRET);
  res.status(201).json({ status: true, token });

  res.send("login student");
};






//Register student 

const registerStudent = async (req, res, next) => {

  const { email, password } = req.body;
  let findStudent = await Student.findOne({ email: email });
  if (!findStudent) {
    return next(customErrorHandler("User not found", 404));
  }

  // use hash password to store password in db

  const salt = bcrypt.genSaltSync(10);
  const SecPass = bcrypt.hashSync(password, salt);
  console.log("secured password is :", SecPass);

  // it will create a document in db

  findStudent.password = SecPass;
  await findStudent.save();
  console.log("User is :", findStudent);

  const data = {
    user: {
      id: findStudent.id,
    },
  };

  // jwt auth token

  const token = jwt.sign(data, JWT_SECRET);

  res.status(201).json({ status: true, token });
};






//Get student details 

const getStudentDetail = async (req, res, next) => {

  // To do : check user id is correct or not

  var userId = req.user.id;  
  const student = await Student.findById(userId);
  if (!student) {
    return next(
      customErrorHandler(`Student not found with id : ${userId}`, 404)
    );
  }
  res.status(200).json({ status: true, student });   
};




//Update student record

const updateStudent = async (req, res, next) => {

  //To do : check the admin id



  //To do

  res.send("update student details");
};




module.exports = { createStudent, loginStudent, getStudentDetail, updateStudent, registerStudent};

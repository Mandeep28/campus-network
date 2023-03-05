const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const { customErrorHandler } = require("../error/customError");
require("dotenv").config();

// JWT secret string
JWT_SECRET = process.env.JWT_SECRET_STRING;

const createStudent = async (req, res, next) => {
  // To do : check if admin id is correct or not

  const { email, currentRollNo, password } = req.body;

  let findStudent = await Student.findOne({ currentRollNo: currentRollNo });
  if (findStudent) {
    return next(customErrorHandler("Duplicate roll number not allowed", 401));
  }
  findStudent = await Student.findOne({ email: email });
  if (findStudent) {
    return next(customErrorHandler("Duplicate email not allowed", 401));
  }

  const student = await Student.create(req.body);
  res.status(200).json({ msg: "Student Account Created", student });
};

const loginStudent = async (req, res, next) => {
  const { email, password } = req.body;
  let findStudent = await Student.findOne({ email: email });
  if (!findStudent) {
    return next(
      customErrorHandler("Please provide the correct credentials", 401)
    );
  }
  const passwordChecked = await bcrypt.compare(password, user.password);

  if (!passwordChecked) {
    return next(
      customErrorHandler("Please Login With correct Creditials", 401)
    );
  }

  const data = {
    user: {
      id: findStudent.id,
    },
  };
  // jwt auth token
  const token = jwt.sign(data, JWT_SECRET);
  res.status(201).json({ status: true, token });

  res.send("login student");
};

const registerStudent = async (req, res, next) => {
  const { email, password } = req.body;
  let findStudent = await Student.findOne({ email: email });
  if (!findStudent) {
    return next(customErrorHandler("User not found", 404));
  }

  // use hash password to store password in db
  const salt = bcrypt.genSaltSync(10);
  const SecPass = bcrypt.hashSync(req.body.password, salt);
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

const getStudentDetail = async (req, res, next) => {
  // To do : check user id is correct or not
  const userId = req.user.id;

  const student = await Student.findOne({ _id: userId });
  if (!student) {
    return next(
      customErrorHandler(`Student not found with id : ${userId}`, 404)
    );
  }
  res.status(200).json({ status: true, student });
};
const updateStudent = async (req, res, next) => {
  //    To do : check the admin id

  // to do

  res.send("update student details");
};

module.exports = {
  createStudent,
  loginStudent,
  getStudentDetail,
  updateStudent,
  registerStudent,
};

const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const Teacher = require("../models/Teacher");
const { customErrorHandler } = require("../error/customError");

// JWT secret string
let JWT_SECRET = process.env.JWT_SECRET_STRING;





const createTeacher = async (req, res, next) =>{

    const {email} = req.body;

    var findTeacher = await Teacher.findOne({email});
    if(findTeacher){
        next(customErrorHandler("Duplicate email not allowed", 401));
    }

    const salt = bcrypt.genSaltSync(10);
    const SecPass = bcrypt.hashSync(req.body.password, salt);
  
    const teacher = await Teacher.create({
      email: req.body.email,
      departmentName : req.body.departmentName,
      password: SecPass,
    });
  
    res.status(200).json({ msg: "Teacher Account Created", teacher});

}






const loginTeacher = async (req, res, next) => {
    const { email, password } = req.body;
    let findTeacher = await Teacher.findOne({ email });
    if (!findTeacher) {
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
        id: findTeacher.id,
      }
    };
  
    // jwt auth token
  
    const token = jwt.sign(data, JWT_SECRET);
    res.status(201).json({ status: true, token });
  
    res.send("Login Teacher");
  };





const getTeacherDetail = async (req, res, next) => {

  // To do : check user id is correct or not

  var userId = req.user.id;  
  const teacher = await Teacher.findById(userId);
  if (!teacher) {
    return next(
      customErrorHandler(`Teacher not found with id : ${userId}`, 404)
    );
  }
  res.status(200).json({ status: true, teacher });   
};





const registerTeacher = async (req, res, next) => {

    const { email, password } = req.body;
    let findTeacher = await Teacher.findOne({ email: email });
    if (!findTeacher) {
      return next(customErrorHandler("User not found", 404));
    }
  
    // use hash password to store password in db
  
    const salt = bcrypt.genSaltSync(10);
    const SecPass = bcrypt.hashSync(password, salt);
    console.log("secured password is :", SecPass);
  
    // it will create a document in db
  
    findTeacher.password = SecPass;
    await findTeacher.save();
    console.log("User is :", findTeacher);
  
    const data = {
      user: {
        id: findTeacher.id,
      },
    };
  
    // jwt auth token
  
    const token = jwt.sign(data, JWT_SECRET);
  
    res.status(201).json({ status: true, token });
  };





const updateTeacher = async(req, res, next) =>{

}

module.exports = { createTeacher, loginTeacher, getTeacherDetail, updateTeacher, registerTeacher};

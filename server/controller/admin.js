const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const User = require("../models/User");
const Alumini = require("../models/Alumini");
const Department = require("../models/Department");
const Course = require("../models/Course");

// Client Url
const origin = "http://localhost:3000";

const createUser = async (req, res) => {
  const adminInfo = req.user;
  const { email } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    throw new customError("Email already exists", StatusCodes.BAD_REQUEST);
  }

  let user = "";
  const { hidden } = req.body;
  console.log(hidden);
  if (hidden === "student") {
    const {
      name,
      email,
      rollno,
      semester,
      course,
      degreeType,
    } = req.body;
    const findUser = await Student.findOne({ email });
    if (findUser) {
      throw new customError("Email already exists", StatusCodes.BAD_REQUEST);
    }

     user = await Student.create({
      name,
      email,
      rollno,
      semester,
      course,
      degreeType,
      createdBy:adminInfo._id,
    });

    
  } else if (hidden === "teacher") {
    const { name, email, department } = req.body;

    const findUser = await Teacher.findOne({ email });
    if (findUser) {
      throw new customError("Email already exists", StatusCodes.BAD_REQUEST);
    }

     user = await Teacher.create({
      name,
      email,
      department:department,
      createdBy: adminInfo._id,
    });

  
  } else {
    throw new customError("Something Went Wrong", StatusCodes.BAD_REQUEST);
  }
  console.log(user);
  
  res.status(StatusCodes.CREATED).json(user);
};

const getAllUser = async (req, res) => {
  const type = req.query.type;
  let data = [];
  // if(type === "all") {

  // }
  if (type === "student") {
    data = await Student.find({}).populate({
      path: 'course',
      populate: {
        path: 'department'
    }}).populate("createdBy", "-password");
  }
  if (type === "teacher") {
    data = await Teacher.find({}).populate("department", "name").populate("createdBy", "-password");
  }
  res.status(StatusCodes.OK).json({ data, length: data.length });
};

// --------------------------------- Student ----------------------------------

const getStudent = async (req, res) => {
  const id = req.params.id;
  const student = await Student.findOne({ _id: id });
  if (!student) {
    throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ student });
};
const updateStudent = async (req, res) => {
  const id = req.params.id;
  let student = await Student.findOne({ _id: id });
  if (!student) {
    throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
  }
  student = await Student.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Student update successfully", student });
};
const delteStudent = async (req, res) => {
  const id = req.params.id;
  console.log("id in params is :", id);

  let student = await Student.findById(id);
  console.log("student details is : ", student);

  if (!student) {
    throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
  }
  student = await Student.findOneAndDelete({ _id: id });
  res
    .status(StatusCodes.OK)
    .json({ msg: "student delete successsfully", student });
};

// ----------------------- Teacher -------------------------------------
const getTeacher = async (req, res) => {
  const id = req.params.id;
  const teacher = await Teacher.findOne({ _id: id });
  if (!teacher) {
    throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ teacher });
};
const updateTeacher = async (req, res) => {
  const id = req.params.id;
  let teacher = await Teacher.findOne({ _id: id });
  if (!teacher) {
    throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
  }
  teacher = await Student.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Teacher updated successfullly", teacher });
};
const deleteTeacher = async (req, res) => {
  const id = req.params.id;
  let teacher = await Teacher.findOne({ _id: id });
  if (!teacher) {
    throw new customError(`No user found with id ${id}`, StatusCodes.NOT_FOUND);
  }
  teacher = await Teacher.findOneAndDelete({ _id: id });
  res
    .status(StatusCodes.OK)
    .json({ msg: "Teacher delete successfullly", teacher });
};

// ---------------------------------- Admin ---------------------------------------

// admin register
const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  //   check if user is already present or not in User model
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new customError("Email Already Exist", StatusCodes.BAD_REQUEST);
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    name,
    email,
    password,
    role: "admin",
    verificationToken,
  });

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  // send verification token back only while testing in postman!!!
  console.log("verificatoin token", verificationToken);
  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email to verify account",
  });
};

// update the semester
const updateSemester = async (req, res) => {
  const adminInfo = req.user;
  await Student.updateMany({}, { $inc: { semester: 1 } });

  // reference : { name: 'Space Ghost', age: { $gte: 21, $lte: 65 }}
  // reference2 :  { $or: [{ name: "Rambo" }, { breed: "Pugg" }, { age: 2 }] }
  const data = await Student.find({
    $or: [
      { degreeType: "ug_3", semester: { $gte: 7 } },
      { degreeType: "ug_4", semester: { $gte: 9 } },
      { degreeType: "pg_2", semester: { $gte: 5 } },
      { degreeType: "pg_3", semester: { $gte: 7 } },
    ],
  });
  const newData = data.map((obj) => {
    return {
      name: obj.name,
      email: obj.email,
      department: {
        name: obj.department.name,
        id: obj.department.id,
      },
      degreeType: obj.degreeType,
      course: obj.course,
      image: obj.image,
      createdBy: {
        name: adminInfo.name,
        id: adminInfo._id,
      },
    };
  });

  await Alumini.insertMany([newData]);
  res
    .status(StatusCodes.OK)
    .json({ msg: "semester update successfully + alumini added" });
};

//  ---------------------- Add new department  -----------------------
const addDepartment = async (req, res) =>{
  const userData = req.user;
  const {name} = req.body;
  const department = await Department.create({
    name, 
    createdBy : userData._id
  });

  res.status(StatusCodes.CREATED).json({department , msg: "department added successfully"})

}


//  --------------------- Get all department -------------------------------
const getDepartments = async (req, res) =>{
  const departments = await Department.find({});

  res.status(StatusCodes.OK).json({departments})
}


//  ------------------ add course -------------------------------
const addCourse = async (req, res) =>{
  const {name, department, totalSemester}= req.body;
  const adminInfo = req.user;

  const course = await Course.create({
    name, 
    department, totalSemester,
    createdBy: adminInfo._id
  })
  res.status(StatusCodes.CREATED).json(course);

}


//  ------------------------ Get all course -------------------------
const getcourse = async (req, res) =>{
  const course = await Course.find({});
  res.status(StatusCodes.OK).json({course, length: course.length});
}






module.exports = {
  createUser,
  getAllUser,
  getStudent,
  updateStudent,
  delteStudent,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  updateSemester,
  adminRegister,
  addDepartment , 
  getDepartments,
  addCourse, getcourse
};

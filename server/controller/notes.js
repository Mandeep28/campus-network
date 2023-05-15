const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const Notes = require("../models/Notes");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const ObjectId = require('mongoose').Types.ObjectId;

const postNote = async (req, res) => {
  const teacherData = req.data;

  const {
    title,
   url,
    subjectId,
  } = req.body;

 
  const notes = await Notes.create({
    title,
    attachment_url : url,
    subject : subjectId,
    uploadBy:teacherData._id
  });
  res.status(StatusCodes.CREATED).json(notes);
};

//  ----------------------- Get notes to student , teacher , admin  ---------------------
const getNotes = async (req, res) => {
  const userData = req.data;
  const subjectId = req.query.id;
  if (userData.role === "student") {
    const findUser = await Student.findOne({ email: userData.email });
    if (!findUser) {
      throw new customError("Not authorized", StatusCodes.UNAUTHORIZED);
    }

    const subject = await Subject.findById(subjectId);
    if(!subject) {
      throw new customError(`No subject found with id ${subjectId}`, StatusCodes.UNAUTHORIZED);
    }

    const data = await Notes.find({subject : subjectId}).populate("uploadBy", "-password");
    res.status(StatusCodes.OK).json({ data, length: data.length , subject });
  } else if (userData.role === "teacher") {
    const findUser = await Teacher.findOne({ email: userData.email });
    if (!findUser) {
      throw new customError("Not authorized", StatusCodes.UNAUTHORIZED);
    }
    const data = await Notes.find({uploadBy : ObjectId(userData._id) }).populate("uploadBy", "-password");
    res.status(StatusCodes.OK).json({ data, length: data.length });
  } else if (userData.role === "admin") {
    const data = await Notes.find({}).populate("uploadBy", "-password");
    res.status(StatusCodes.OK).json({ data, length: data.length });
  } else {
    throw new customError("User type not exits", StatusCodes.UNAUTHORIZED);
  }
};











//  ---------------------- get single notes -----------------------
const getSingleNote = async (req, res) => {
  const notesId = req.params.id;
  const data = await Notes.findById(notesId);
  if (!data) {
    throw new customError(
      `no data found with id : ${notesId}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json(data);
};

//  ------------------- update notes ----------------------------
const updateNote = async (req, res) => {
  const notesId = req.params.id;
  const teacherData = req.data;
  const data = await Notes.findById(notesId);
  if (!data) {
    throw new customError(
      `no notes found with id : ${notesId}`,
      StatusCodes.NOT_FOUND
    );
  }

  if (!data.uploadBy.id.equals(teacherData._id)) {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }
  data = await Notes.findOneAndUpdate({ _id: notesId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json(data);
};

// ------------------------- delete notes -----------------------------------

const deleteNote = async (req, res) => {
  const notesId = req.params.id;
  const userInfo = req.data;

  const data = await Notes.findById(notesId);
  if (!data) {
    throw new customError(
      `no notes found with id : ${notesId}`,
      StatusCodes.NOT_FOUND
    );
  }
  if(userInfo.role === "admin") {
    await data.remove();
    res.status(StatusCodes.OK).json({ msg: "note deleted successfully" });
    return ;
  }



  if (!data.uploadBy.equals(userInfo._id)) {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }
  await data.remove();
  res.status(StatusCodes.OK).json({ msg: "note deleted successfully" });
};

//  ------------------- add , delete , update subject -------------------------------
const postSubject = async (req, res) => {
  const teacherData = req.data;
  const { name, course, semester } = req.body;
 
  const subject = await Subject.create({
    name,
    course,
    semester,
    createdBy:teacherData._id
  });
  res.status(StatusCodes.CREATED).json(subject);
};

// ------------------------ get all subject ------------------------------
const getSubject = async (req, res) => {
  const userData = req.data;
  // console.log(userData);
  
  if (userData.role === "student") {
    const findUser = await Student.findOne({ email: userData.email });
    console.log("find user is " , findUser);
    
    if (!findUser) {
      throw new customError("Not authorized", StatusCodes.UNAUTHORIZED);
    }
    const data = await Subject.find({course: findUser.course, semester : findUser.semester });
    res.status(StatusCodes.OK).json({data, length: data.length});
    console.log("data is ", data);
    
  }
  else if (userData.role === "teacher") {
    const findUser = await Teacher.findOne({ email: userData.email });
    if (!findUser) {
      throw new customError("Not authorized", StatusCodes.UNAUTHORIZED);
    }
    const data = await Subject.find({ createdBy : userData._id})
    res.status(StatusCodes.OK).json({data, length: data.length});

  }
  else if(userData.role === "admin") {
    const data = await Subject.find({}).populate("course", "name").populate("createdBy", "name email")
    res.status(StatusCodes.OK).json({data, length: data.length});
  }
  else {
    throw new customError("User type not exits", StatusCodes.UNAUTHORIZED);
  }
};

//  ------------------- update subject ----------------------------
const updateSubject = async (req, res) => {
  const subjectId = req.params.id;
  let data = await Subject.findById(subjectId);
  if (!data) {
    throw new customError(
      `no subject found with id : ${subjectId}`,
      StatusCodes.NOT_FOUND
    );
  }
  data = await Subject.findOneAndUpdate({ _id: subjectId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json(data);
};
//  ------------------- delete subject ----------------------------
const deleteSubject = async (req, res) => {
  const subjectId = req.params.id;
  const data = await Subject.findById(subjectId);
  if (!data) {
    throw new customError(
      `no subject found with id : ${subjectId}`,
      StatusCodes.NOT_FOUND
    );
  }
  await data.remove();
  res.status(StatusCodes.OK).json(data);
};

module.exports = {
  postNote,
  getSingleNote,
  getNotes,
  updateNote,
  deleteNote,
  postSubject,
  getSubject,
  deleteSubject,
  updateSubject,
};

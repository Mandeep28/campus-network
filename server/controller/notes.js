const customError = require("../error/customError");
const { StatusCodes } = require("http-status-codes");
const Notes = require("../models/Notes");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Subject = require("../models/Subject");

const postNote = async (req, res) => {
  const teacherData = req.user;

  const {
    title,
    attachment_url,
    departmentName,
    departmentId,
    course,
    semester,
    subjectId,
  } = req.body;

  if (teacherData.department.id !== departmentId) {
    throw new customError(
      "Notes can only be upload for same department. ",
      StatusCodes.UNAUTHORIZED
    );
  }
  const notes = await Notes.create({
    title,
    attachment_url,
    department: {
      name: departmentName,
      id: departmentId,
    },
    course,
    semester,
    subjectId,
    uploadBy: {
      name: teacherData.name,
      id: teacherData._id,
    },
  });
  res.status(StatusCodes.CREATED).json(notes);
};

//  ----------------------- Get notes to student , teacher , admin  ---------------------
const getNotes = async (req, res) => {
  const userData = req.data;
  if (userData.role === "student") {
    const findUser = await Student.findOne({ email: userData.email });
    if (!findUser) {
      throw new customError("Not authorized", StatusCodes.UNAUTHORIZED);
    }
    const data = await Notes.find({
      department: {
        id: findUser.department.id,
      },
      course: findUser.course,
      semester: findUser.semester,
    });
    res.status(StatusCodes.OK).json({ data, length: data.length });
  } else if (userData.role === "teacher") {
    const findUser = await Teacher.findOne({ email: userData.email });
    if (!findUser) {
      throw new customError("Not authorized", StatusCodes.UNAUTHORIZED);
    }
    const data = await Notes.find({
      uploadBy: {
        id: findUser._id,
      },
    });
    res.status(StatusCodes.OK).json({ data, length: data.length });
  } else if (userData.role === "admin") {
    const data = await Notes.find({});
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
  const teacherData = req.user;
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
  const teacherData = req.user;
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
  await data.remove();
  res.status(StatusCodes.OK).json({ msg: "note deleted successfully" });
};

//  ------------------- add , delete , update subject -------------------------------
const postSubject = async (req, res) => {
  const teacherData = req.user;
  const { name, departmentName, departmentId, course, semester } = req.body;
  if (teacherData.department.id !== departmentId) {
    throw new customError(
      "Subject can only be upload for same department. ",
      StatusCodes.UNAUTHORIZED
    );
  }
  const subject = await Subject.create({
    name,
    department: {
      name: departmentName,
      id: departmentId,
    },
    course,
    semester,
    createdBy: {
      name: teacherData.name,
      id: teacherData._id,
    },
  });
  res.status(StatusCodes.CREATED).json(subject);
};

// ------------------------ get all subject ------------------------------
const getSubject = async (req, res) => {
  const userData = req.data;
  if (userData.role === "student") {
    const findUser = await Student.findOne({ email: userData.email });
    if (!findUser) {
      throw new customError("Not authorized", StatusCodes.UNAUTHORIZED);
    }
    const data = await Subject.find({
      department: {
        id: findUser.department.id,
      },
      course: findUser.course,
      semester: findUser.semester,
    });
    res.status(StatusCodes.OK).json({data, length: data.length});
  }
  else if (userData.role === "teacher") {
    const findUser = await Teacher.findOne({ email: userData.email });
    if (!findUser) {
      throw new customError("Not authorized", StatusCodes.UNAUTHORIZED);
    }
    const data = await Subject.find({
        uploadby : {
            id : findUser._id
        }
    })
    res.status(StatusCodes.OK).json({data, length: data.length});

  }
  else if(userData.role === "admin") {
    const data = await Subject.find({})
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

const { StatusCodes } = require("http-status-codes");
const Notices = require("../models/Notices");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const createNotice = async (req, res) => {
  const adminInfo = req.user;
  const {
    title,
    body,
    attachment_url,
    departmentName,
    departmentId,
    courseType,
    type,
    notice_for,
  } = req.body;

  let data = {
    title,
    department: {
      name: departmentName,
      id: departmentId,
    },
    courseType,
    type,
    notice_for,
    uploadBy: {
      name: adminInfo.name,
      id: adminInfo._id,
    },
  };
  if (body) {
    data.body = body;
  } else if (attachment_url) {
    data.attachment_url = attachment_url;
  }
  const notice = await Notices.create(data);
  res.status(StatusCodes.CREATED).json(notice);
};
//  -------------------- For user role : (student) and {teacher} only  ----------------------------------------

const getAllNotices = async (req, res) => {
  const userData = req.data;
  if (userData.role === "student") {
    const user = await Student.findOne({ email: userData.email });
    if (!user) {
      throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
    }
    const data = await Notices.find({
      department: { id: user.department.id },type: "notice",
      $or: [{ notice_for: userData.role }, { notice_for: "both" }],
    });
    res.status(StatusCodes.OK).json({ data, length: data.length });
  } else if (userData.role === "teacher") {
    const user = await Teacher.findOne({ email: userData.email });
    if (!user) {
      throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
    }
    const data = await Notices.find({
      department: { id: user.department.id },
      $or: [{ notice_for: userData.role }, { notice_for: "both" }],
    });
    res.status(StatusCodes.OK).json({ data, length: data.length });
  } else if (userData.role === "admin") {
    const user = await Teacher.findOne({ email: userData.email });
    if (!user) {
      throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
    }
    const data = await Notices.find({});
    res.status(StatusCodes.OK).json({ data, length: data.length });
  } else {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }
};

const getSingleNotice = async (req, res) =>{
  const noticeId = req.params.id;
  const data = await Notices.findById(noticeId);
  if (!data) {
    throw new customError(`no data found with id : ${noticeId}`, StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json(data);

}

//  -----Get his/her  notices / event / news to user role : (admin) and he/she can update delete the same -------

 const getNotices = async (req, res) =>{
  const adminInfo = req.user;
  const data = await Notices.find({uploadBy : {id: adminInfo._id}});
  res.status(StatusCodes.OK).json({data, length: data.length});
}

const updateNotice = async (req, res) =>{
  const noticeId = req.params.id;
  const adminInfo = req.user;
  let data = await Notices.findById(noticeId);
  if (!data) {
    throw new customError(`no data found with id : ${noticeId}`, StatusCodes.NOT_FOUND);
  }
  if (!data.uploadBy.id.equals(adminInfo._id)) {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }
  data = await Notices.findOneAndUpdate({ _id: noticeId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json(data);
}

const deleteNotice = async (req, res) =>{
  const noticeId = req.params.id;
  const adminInfo = req.user;
  let data = await Notices.findById(noticeId);
  if (!data) {
    throw new customError(`no data found with id : ${noticeId}`, StatusCodes.NOT_FOUND);
  }
  if (!data.uploadBy.id.equals(adminInfo._id)) {
    throw new customError("Not authorized ", StatusCodes.UNAUTHORIZED);
  }
 await data.remove();
  res.status(StatusCodes.OK).json({msg: "notice delete successfully"});
}

module.exports = {
  createNotice,
  getAllNotices, 
  getNotices , 
  getSingleNotice, 
  updateNotice, 
  deleteNotice
};

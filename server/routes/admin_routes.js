const express = require("express");
const router = express.Router();

const {
    createUser,
    getAllUser,
    getStudent,
    updateStudent,
    delteStudent,
    getTeacher,
    updateTeacher,
    deleteTeacher,
    updateSemester,
    adminRegister
  } = require("../controller/admin");
  const  {
    createNotice,
    getAllNotices ,
    getNotices , 
    getSingleNotice ,
    updateNotice, 
    deleteNotice
  } = require("../controller/notice");

//  create user , update user , delete user 
router.route("/user").post(createUser).get(getAllUser);
router.route("/student/:id").get(getStudent).put(updateStudent).delete(delteStudent);
router.route("/teacher/:id").get(getTeacher).put(updateTeacher).delete(deleteTeacher);

// admin register 
router.post('/register',adminRegister );
// update semester + add alumini entry in alumini collections
router.get("/updateSemester", updateSemester);

// notice routes
router.route("/notice").post(createNotice).get(getAllNotices);
router.route("/notice:id").get(getNotices).put(updateNotice).delete(deleteNotice);

//  send all the notice of their own
router.get('/mynotice', getNotices);



module.exports = router;
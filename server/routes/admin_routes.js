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
    adminRegister,
    addDepartment , 
    getDepartments ,
    addCourse, getcourse, deleteDepartment , deleteCourse, getAllRegisterUser , deleteRegisterUser
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
router.route("/notice/:id").get(getNotices).put(updateNotice).delete(deleteNotice);

//  send all the notice of their own
router.get('/mynotice', getNotices);

//  department routes (add and get)
router.route("/department").post(addDepartment).get(getDepartments)
router.route("/department/:id").delete(deleteDepartment)
router.route("/course").post(addCourse).get(getcourse);
router.route("/course/:id").delete(deleteCourse)

router.route("/registeruser").get(getAllRegisterUser)
router.route("/registeruser/:id").delete(deleteRegisterUser)





module.exports = router;
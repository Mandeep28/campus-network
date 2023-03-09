const express = require("express");
const router = express.Router();

const  {createUser, getAllUser, getStudent,  updateStudent , delteStudent, getTeacher, updateTeacher, deleteTeacher} = require("../controller/admin");


router.route("/user").post(createUser).get(getAllUser);
router.route("/student/:id").get(getStudent).put(updateStudent).delete(delteStudent);
router.route("/teacher/:id").get(getTeacher).put(updateTeacher).delete(deleteTeacher);



module.exports = router;
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


router.route("/user").post(createUser).get(getAllUser);
router.route("/student/:id").get(getStudent).put(updateStudent).delete(delteStudent);
router.route("/teacher/:id").get(getTeacher).put(updateTeacher).delete(deleteTeacher);

// admin register 
router.post('/register',adminRegister );
// update semester + add alumini entry in alumini collections
router.get("/updateSemester", updateSemester);



module.exports = router;
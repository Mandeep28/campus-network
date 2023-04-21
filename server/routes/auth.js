const express = require("express");
const router = express.Router();
const authUser = require("../middleware/authUser");
const {login, register, getUserDetail, verifyEmail, resetPassword, forgotPassword , allUsers} = require("../controller/auth");

const {protect} = require("../middleware/authMiddleware");


router.post("/login" ,login)
router.post("/register" ,register)
router.post('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);
router.get("/getuserdetail" , getUserDetail)

// admin 
// router.post("/admin-login", adminLogin);

router.get("/users/", protect , allUsers);




module.exports = router;
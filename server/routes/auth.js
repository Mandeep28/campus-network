const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const {login, register, getUserDetail, verifyEmail, resetPassword, forgotPassword, adminLogin} = require("../controller/auth");


router.post("/login" ,login)
router.post("/register" ,register)
router.post('/verify-email', verifyEmail);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);
router.get("/getuserdetail" ,fetchUser, getUserDetail)

// admin 
// router.post("/admin-login", adminLogin);



module.exports = router;
const express = require("express");
const router = express.Router();
const authUser = require("../middleware/authUser");
const {
  login,
  register,
  getUserDetail,
  verifyEmail,
  resetPassword,
  forgotPassword,
  allUsers,
  getDetails,
  updateProfile, 
  changePassword
} = require("../controller/auth");

const { protect } = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);
//  get the details from student / teacher collection corresponsding to the email of user
router.get("/getDetail", authUser, getDetails);
// get details of user from user collection
router.get("/getuserdetail", getUserDetail);
// update profile
router.put("/updateProfile" , updateProfile);
//  change password 
router.post("/changePassword", changePassword)




router.get("/users/", protect, allUsers);

module.exports = router;

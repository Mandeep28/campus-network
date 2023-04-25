// External packages
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Custom Error
const customError = require("../error/customError");

// send mail module
const sendVerificationEmail = require("../mail/sendVerificationEmail");
const sendResetPassswordEmail = require("../mail/sendResetPasswordEmail");

// DB models
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

// Client Url
const origin = "http://localhost:3000";

// Register User
const register = async (req, res) => {
  const { hidden, name, email, password } = req.body;

  //   check if user is already present or not in User model
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw new customError("Email Already Exist", StatusCodes.BAD_REQUEST);
  }
  var role = "";
  const isFirstAccount = (await User.countDocuments({})) === 0;
  if (isFirstAccount) {
    role = "admin";
  } else {
    //   if student want to register
    if (hidden === "student") {
      // check if student data is present in Student model or not
      const findUser = await Student.findOne({ email });
      if (!findUser) {
        throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
      }
      role = "student";
    }
    //   if teacher want to register
    if (hidden === "teacher") {
      // check if teacher data is present in Teacher model or not
      const findUser = await Teacher.findOne({ email });
      if (!findUser) {
        throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
      }
      role = "teacher";
    }
    // Uncomment this to make your first admin
    // if(hidden === "admin") {
    //   role = "admin"
    // }
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  // send verification token back only while testing in postman!!!
  console.log("verificatoin token", verificationToken);
  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email to verify account",
  });
};

// Verify details
const verifyEmail = async (req, res) => {
  const { token, email } = req.body;
  //   check if user is already present or not in User model
  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  if (findUser.isVerified) {
    res.status(StatusCodes.OK).json({ msg: "Email Already verified" });
    return;
  }
  if (token !== findUser.verificationToken) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  findUser.isVerified = true;
  findUser.verified = Date.now();
  findUser.verificationToken = "";

  await findUser.save();

  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};

// login User
const login = async (req, res) => {
  const { email, password } = req.body;
  //   check if user is already present or not in User model
  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new customError(
      "Please Provide correct credentials",
      StatusCodes.UNAUTHORIZED
    );
  }
  const isPasswordMatch = await findUser.comparePassword(password);
  if (!isPasswordMatch) {
    throw new customError(
      "Please Provide correct credentials",
      StatusCodes.UNAUTHORIZED
    );
  }
  if (!findUser.isVerified) {
    throw new customError("Please Verify Your Email", StatusCodes.BAD_REQUEST);
  }
  const token = await findUser.createJWT();
  res.status(StatusCodes.OK).json({
    token,
    _id: findUser._id,
    name: findUser.name,
    role: findUser.role,
    email: findUser.email,
  });
};

// it will send a email that contain link for reset the password
const resetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new customError(
      "Please provide a valid email",
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  const passwordToken = crypto.randomBytes(70).toString("hex");
  // send email
  await sendResetPassswordEmail({
    name: user.name,
    email: user.email,
    token: passwordToken,
    origin,
  });

  const tenMinutes = 1000 * 60 * 10;
  const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
  user.passwordToken = passwordToken;
  user.passwordTokenExpirationDate = passwordTokenExpirationDate;
  user.save();
  console.log(passwordToken);
  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

// it will change the password
const forgotPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new customError("Please provide all values", StatusCodes.BAD_REQUEST);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  const currentDate = new Date();

  if (
    user.passwordToken === token &&
    user.passwordTokenExpirationDate > currentDate
  ) {
    user.password = password;
    user.passwordToken = null;
    user.passwordTokenExpirationDate = null;
    await user.save();
  } else {
    throw new customError(
      "Reset password Link expired.",
      StatusCodes.UNAUTHORIZED
    );
  }
  res.status(StatusCodes.OK).json({ msg: "Password Reset successfully" });
};

//  Send the user detials after checking the correct id
const getUserDetail = async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  let data = jwt.verify(token, process.env.JWT_SECRET);
  const id = data.userid;
  const findUser = await User.findOne({ _id: id });

  if (!findUser) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  res.status(StatusCodes.OK).json({ details: findUser });
};
//  get detail of user from student and teacher collection (according to their role )
const getDetails = async (req, res) => {
  const { email, role } = req.data;
  let details = {};
  if (role === "student") {
    details = await Student.findOne({ email }).populate({
      path: 'course',
      populate: {
        path: 'department'
      }});
  } else if (role === "teacher") {
    details = await Teacher.findOne({ email }).populate("department", "name");
  }
  if (!details) {
    throw new customError("No details found", StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ details });
};

//  update Profile
const updateProfile = async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  let data = jwt.verify(token, process.env.JWT_SECRET);
  const id = data.userid;
  const userData = await User.findOne({ _id: id });
  if (!userData) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  const { image, name } = req.body;
  // console.log("iamge is ", image, "name is : ", name);
  
  if(!image || !name) {
    throw new customError("Please provide all values", StatusCodes.BAD_REQUEST);
  }


  const user = await User.findOneAndUpdate(
    { _id: userData._id },
    {
      image,
      name,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ details: user, msg: "Fields update successfully" });
};

// --------------------- changePassword   ---------------------------------
const changePassword = async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  let data = jwt.verify(token, process.env.JWT_SECRET);
  const id = data.userid;
  const userData = await User.findOne({ _id: id });
  if (!userData) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  const { oldpassword, password } = req.body;
  if(!oldpassword || !password) {
    throw new customError("Please provide all values", StatusCodes.BAD_REQUEST);
  }

  //  check if old password match or not
  const isPasswordMatch = await userData.comparePassword(oldpassword);
  if (!isPasswordMatch) {
    throw new customError(
      "Please Provide correct credentials",
      StatusCodes.UNAUTHORIZED
    );
  }
  //  change the password 
  userData.password = password;
  await userData.save();
  res.status(StatusCodes.OK).json({ msg: "Password change successfully" });
};

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } }, //case insensitive
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  //console.log(keyword,'search keyword'); //{}
  //user id from protect MW
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  //not including the logged in user
  //console.log(users, 'matching search users');
  res.send(users);
});

module.exports = {
  register,
  login,
  getUserDetail,
  verifyEmail,
  resetPassword,
  forgotPassword,
  allUsers,
  getDetails,
  updateProfile,
  changePassword
};

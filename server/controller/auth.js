// External packages
const crypto = require("crypto");
const { StatusCodes } = require("http-status-codes");


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
  let role = "";
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
    const {email, password} = req.body;
  //   check if user is already present or not in User model
  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new customError("Please Provide correct credentials", StatusCodes.UNAUTHORIZED)
  }
  const isPasswordMatch = await findUser.comparePassword(password);
  if(!isPasswordMatch) {
    throw new customError("Please Provide correct credentials", StatusCodes.UNAUTHORIZED)
  }
  if(!findUser.isVerified) {
    throw new customError("Please Verify Your Email", StatusCodes.BAD_REQUEST);
 }
 const token = await findUser.createJWT();
 res.status(StatusCodes.OK).json({token , name: findUser.name})

};

//  Send the user detials after checking the correct id 
const getUserDetail = async (req, res) => {
    const {userid, email, role} = req.user;
      //   check if user is already present or not in User model
  const findUser = await User.findOne({ _id : userid });
  if (!findUser) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  let details = {};
  if(role === "student") {
     details = await Student.findOne({email});
  }
  if(role === "teacher") {
     details = await Teacher.findOne({email});
  }
  res.status(StatusCodes.OK).json({details})
};


// it will send a email that contain link for reset the password
const resetPassword = async (req, res) =>{
    const {email} = req.body; 
    if(!email) {
        throw new customError ("Please provide a valid email", StatusCodes.BAD_REQUEST);
    }
    const user = await User.findOne({email});
    if(!user) {
        throw new customError ("Unauthorized", StatusCodes.UNAUTHORIZED);
    }
    const passwordToken = crypto.randomBytes(70).toString('hex');
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
    console.log(passwordToken)
    res.status(StatusCodes.OK).json({ msg: 'Please check your email for reset password link' });
}



// it will change the password
const forgotPassword = async (req, res) =>{
    const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new customError('Please provide all values', StatusCodes.BAD_REQUEST);
  }
  const user = await User.findOne({ email });
  if(!user) {
    throw new customError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }

    const currentDate = new Date();

    if ( user.passwordToken === token &&  user.passwordTokenExpirationDate > currentDate ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
    else {
        throw new customError("Link is expired please generate reset Password link again.", StatusCodes.UNAUTHORIZED);
    }
    res.status(StatusCodes.OK).json({msg: 'Password Reset successfully'});
}

// Admin Login 
const adminLogin = async (req, res) =>{
  const {email, password} = req.body;
  //   check if user is already present or not in User model
  const findUser = await User.findOne({ email , role : 'admin'});
  if (!findUser) {
    throw new customError("Please Provide correct credentials", StatusCodes.UNAUTHORIZED)
  }
  const isPasswordMatch = await findUser.comparePassword(password);
  if(!isPasswordMatch) {
    throw new customError("Please Provide correct credentials", StatusCodes.UNAUTHORIZED)
  }
  if(!findUser.isVerified) {
    throw new customError("Please Verify Your Email", StatusCodes.BAD_REQUEST);
 }
 const token = await findUser.createJWT();
 res.status(StatusCodes.OK).json({token , name: findUser.name})

}




module.exports = { register, login, getUserDetail , verifyEmail, resetPassword, forgotPassword , adminLogin};

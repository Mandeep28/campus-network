const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator');


const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: [true, "please provide the passowrd"],
    minlength: 3,
    maxlength: 50
  },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
          validator: validator.isEmail,
          message: 'Please provide valid email',
        },
      },
    password : {
        type: String, 
        required: [true, "please provide the passowrd"],
        minlength: 6,
    },
    role: {
        type: String, 
        enum : ['student', 'teacher', 'admin'], 
        default : 'student'
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },

  });

  userSchema.pre('save', async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

userSchema.methods.createJWT = async function () {
    return jwt.sign({userid: this._id, email: this.email, role : this.role}, process.env.JWT_SECRET, {expiresIn: '30d'});
}


  userSchema.methods.comparePassword = async function(enterPassword) {
    const isMatch = await bcrypt.compare(enterPassword, this.password);
    return isMatch;
  }




  module.exports = mongoose.model("User", userSchema);
  









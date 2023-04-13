const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoticeSchema = new Schema({
    title : {
        type: String,
        required: [true, "please provide the title"],
        minlength: 3,
      },
    body : {
        type: String,
        minlength: 3,
      },
      attachment_url : {
        type : String, 
      },
    uploadBy_name : {
        type: String,
        required: [true, "please provide the name"],
        minlength: 3,
        maxlength: 50
      },
      uploadBy_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "please provide the objectId"],
      },
    departmentName : {
        type: String,
        required: [true, "please provide the department name"],
        maxlength: 70,
      },
    semester: {
      type: Number,
      required: [true, "Value must be required"],
    },
    course: {
      type: String,
      required: [true, "Value must be required"],
      minlength: 3,
      maxlength: 60,
    },
    type: {
      type: String, 
      enum : ['notice', 'event', 'news'], 
      default : 'student'
  },
    notice_for: {
      type: String, 
      enum : ['teacher', 'student', 'both'], 
      default : 'student'
  },
}, {timestamps: true});

module.exports = mongoose.model("notices", NoticeSchema);

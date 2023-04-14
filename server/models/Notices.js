const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoticeSchema = new Schema({
    title : {
        type: String,
        required: [true, "Title must be required"],
        minlength: 3,
      },
    body : {
        type: String,
        minlength: 3,
      },
      attachment_url : {
        type : String, 
      },
      uploadBy: {
        name: {
          type: String,
          required: true,
        },
       id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
       }
      },
      semester: {
        type: Number,
        required: [true, "Semester must be required"],
      },
      department : {
        name: {
          type: String,
          required: [true, " department name must be required"],
          maxlength: 70,
        },
        id: {
          type: String,
          required: [true, " department id must be required"],
          maxlength: 70,
        }
    },
  
      course: {
          type: String,
          required: [true, "course name must be required"],
          minlength: 3,
          maxlength: 60,
    
      },
    type: {
      type: String, 
      enum : ['notice', 'event', 'news'], 
      default : 'notice'
  },
    notice_for: {
      type: String, 
      enum : ['teacher', 'student', 'both'], 
      default : 'both'
  },
}, {timestamps: true});

module.exports = mongoose.model("notices", NoticeSchema);

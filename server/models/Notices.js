const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoticeSchema = new Schema({
    title : {
        type: String,
        required: [true, "Title must be required"],
        minlength: 3,
      },
 
      attachment_url : {
        type : String, 
        required: [true, "url must be required"],

      },
      uploadBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
     
      department : {
        type: mongoose.Schema.ObjectId,
        ref: 'Department',
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

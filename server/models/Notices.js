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
      },
 
      attachment_url : {
        type : String, 
        default: "https://dummyimage.com/600x400/696969/fff"

      },
      uploadBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
     
    
    type: {
      type: String, 
      enum : ['notice', 'event', 'news'], 
      default : 'notice'
     
  },
    noticefor: {
      type: String, 
      enum : ['teacher', 'student', 'both'], 
      default : 'both'
  },
}, {timestamps: true});

module.exports = mongoose.model("Notices", NoticeSchema);

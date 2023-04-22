const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title : {
        type: String,
        required: [true, "Title must be required"],
        minlength: 3,
      },
    
      attachment_url : {
        type : String, 
      },
      uploadBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
     
      department : {
        name: {
          type: String,
          required: [true, " department name must be required"],
        },
        id: {
          type: String,
          required: [true, " department id must be required"],
        }
    },
   course : {
    type: String, 
    required: [true, " course must be required"],
   } , 
   semester : {
    type: Number,
    required: [true, "Semester must be required"],
   },
   subjectId : {
    type: mongoose.Schema.ObjectId,
        ref: 'subject',
        required: true,
   }
}, {timestamps: true});

module.exports = mongoose.model("notes", NotesSchema);

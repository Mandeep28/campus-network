const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubjectSchema = new Schema({
    name : {
        type: String,
        required: [true, "subject name must be required"],
        minlength: 3,
      },
    
      createdBy: {
        name: {
          type: String,
          required: true,
        },
       id: {
        type: mongoose.Schema.ObjectId,
        ref: 'teacher',
        required: true,
       }
      },
      department : {
        name: {
          type: String,
          required: [true, " department name must be required"],
          minlength: 3,
          maxlength : 70,
        },
        id: {
          type: String,
          required: [true, " department id must be required"],
        }
    },
   course : {
    type: String, 
    required: [true, " course must be required"],
    minlength: 3,
    maxlength : 70,
   } , 
   semester : {
    type: Number,
    required: [true, "Semester must be required"],
   },
   
}, {timestamps: true});

module.exports = mongoose.model("subject", SubjectSchema);

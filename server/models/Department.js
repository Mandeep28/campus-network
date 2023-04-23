const mongoose = require("mongoose");
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
    name : {
        type: String,
        required: [true, "subject name must be required"],
        minlength: 3,
        trim : true,
      },
    
      createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },


    
   
}, {timestamps: true});

module.exports = mongoose.model("Department", DepartmentSchema);

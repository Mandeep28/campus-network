const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Course name must be required"],
      minlength: 3,
    },
 
    department: {
      type: mongoose.Schema.ObjectId,
      ref: "Department",
    },
   
    totalSemester: {
      type: Number,
      required: [true, "Semester must be required"],
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);

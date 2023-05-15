const mongoose = require("mongoose");
const Course = require("./Course");
const Student = require("./Student");
const Teacher = require("./Teacher");
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

// Department Schema
DepartmentSchema.pre('remove', { document: true }, async function (next) {
  const department = this;

  // Find and delete related courses
  const courses = await Course.find({ department: department._id });

  for (const course of courses) {
    // Delete related students
    await Student.deleteMany({ course: course._id });

    // Delete the course
    await course.remove();
  }
  await Teacher.deleteMany({department: department._id});

  next();
});


module.exports = mongoose.model("Department", DepartmentSchema);

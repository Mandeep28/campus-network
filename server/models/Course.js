const mongoose = require("mongoose");
const Student = require("./Student");
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

// Department Schema
CourseSchema.pre('remove', { document: true }, async function (next) {
  const course = this;

  await Student.deleteMany({course: course._id});
  next();
});


module.exports = mongoose.model("Course", CourseSchema);

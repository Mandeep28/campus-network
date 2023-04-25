const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "subject name must be required"],
      minlength: 3,
    },

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "createdBy must be required"]
    },
   
    course: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: [true, "course must be required"]
    },
    semester: {
      type: Number,
      required: [true, "Semester must be required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subject", SubjectSchema);

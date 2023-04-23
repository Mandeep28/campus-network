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
    },
    department: {
      type: mongoose.Schema.ObjectId,
      ref: "Department",
    },
    course: {
      type: String,
      required: [true, " course must be required"],
      minlength: 3,
      maxlength: 70,
    },
    semester: {
      type: Number,
      required: [true, "Semester must be required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subject", SubjectSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title must be required"],
      minlength: 3,
    },

    attachment_url: {
      type: String,
    },
    uploadBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    department: {
      type: mongoose.Schema.ObjectId,
      ref: "Department",
      required: true,
    },
    course: {
      type: String,
      required: [true, " course must be required"],
    },
    semester: {
      type: Number,
      required: [true, "Semester must be required"],
    },
    subjectId: {
      type: mongoose.Schema.ObjectId,
      ref: "subject",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notes", NotesSchema);

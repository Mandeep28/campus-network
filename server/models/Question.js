const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "please provide the title"],
      minlength: 3,
    },
    body: {
      type: String,
      required: [true, "please provide the body"],
      minlength: 3,
    },
    uploadBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    department: {
      type: mongoose.Schema.ObjectId,
      ref: "Department",
      default : null
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("question", QuestionSchema);

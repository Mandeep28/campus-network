const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    title : {
        type: String,
        required: [true, "please provide the title"],
        minlength: 3,
      },
    body : {
        type: String,
        required: [true, "please provide the body"],
        minlength: 3,
      },
    uploadBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      },
      department : {
        name: {
          type: String,
          required: [true, "department name must be required"],
          maxlength: 70,
        },
        id: {
          type: String,
          required: [true, " department id must be required"],
        }
    },
}, {timestamps: true});

module.exports = mongoose.model("question", QuestionSchema);

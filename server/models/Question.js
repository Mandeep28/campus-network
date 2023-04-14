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
        name: {
          type: String,
        required: [true, "please provide the name"],
        minlength: 3,
        maxlength: 50
        },
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: [true, "please provide the objectId"],
        }
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
          maxlength: 70,
          unique: true,
        }
    },
}, {timestamps: true});

module.exports = mongoose.model("question", QuestionSchema);

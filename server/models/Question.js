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
    uploadBy_name : {
        type: String,
        required: [true, "please provide the name"],
        minlength: 3,
        maxlength: 50
      },
      uploadBy_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "please provide the objectId"],
      },
    departmentName : {
        type: String,
        required: [true, "please provide the department name"],
        maxlength: 70,
      },
}, {timestamps: true});

module.exports = mongoose.model("question", QuestionSchema);

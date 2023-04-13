const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnswerSchema = new Schema({
    answer : {
        type: String,
        required: [true, "please provide the title"],
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
      question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        required: [true, "please provide the objectId"],
      },
}, {timestamps: true});

module.exports = mongoose.model("answer", AnswerSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnswerSchema = new Schema({
    answer : {
        type: String,
        required: [true, "please provide the answer body"],
        minlength: 3,
      },
      uploadBy : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        required: [true, "please provide the objectId"],
      },
      upVote: {
        type: Number,
        default: 0
      },
      downVote: {
        type: Number,
        default: 0
      },
}, {timestamps: true});

module.exports = mongoose.model("Answer", AnswerSchema);

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

   
    subject: {
      type: mongoose.Schema.ObjectId,
      ref: "Subject",
      required: [true, "subject must be required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notes", NotesSchema);

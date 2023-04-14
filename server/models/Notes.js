const mongoose = require("mongoose");
const {Schema} = mongoose;

const NotesSchema = new Schema({
    note_title : {
        type: String,
        require: true
    },
    description : {
        type: String,
        require: true
    },
    category : {
        type: String,
        default: "",
        require: true
    },
    file_type : {
        
    },
    date_uploaded: {
        type: Date.now()
    },
    uploaded_by :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }
},
{timestamps : true});

module.exports = mongoose.model("Notes", NotesSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const AllNoticesSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    attachFile: {
        type: Image,
        default:
            "",
    },
    tag: {
        type: String,
        default: both,
    },
    event: {
        type: boolean
    },
    news: {
        type: boolean
    },
    dept_name: {
        type: String,
        default: all
    },
    uploaded_by: {

    }
});

moudule.exports = mongoose.model("allnotices", AllNoticesSchema);

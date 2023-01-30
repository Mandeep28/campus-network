const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuerySchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    uploaded_by: {
        type: String,
        require: true,
    },
    uploaded_by_id: {
        type: String,
        default:
            "",
    },
    dept_name: {
        type: String,
        require: true,
    },
});

moudule.exports = mongoose.model("query", QuerySchema);

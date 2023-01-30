const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    passowrd: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    secret_key: {
        type: Boolean,
        default: false,
    },
    secret_key_content: {
        type: String,
        default: null
    },
    TimeStamp: {
        type: Date,
        default: Date.now,
    }
});

moudule.exports = mongoose.model("admin", AdminSchema);

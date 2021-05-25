const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
});


const User = mongoose.model('User', schema);
module.exports = User;
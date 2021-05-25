const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: {
        type: String
    },
    urgency: {
        type: String
    },
    description: {
        type: String
    },
    issue_date: {
        type: String
    },
    status: {
        type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    remarks: {
        type: String
    },
    image: {
        type: String
    },
},
{
    timestamps: true
});


const Ticket = mongoose.model('Ticket', schema);
module.exports = Ticket;
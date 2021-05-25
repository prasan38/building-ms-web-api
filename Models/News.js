const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String
    }
},
    {
        timestamps: true
});


const News = mongoose.model('News', schema);
module.exports = News;
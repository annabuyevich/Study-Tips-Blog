var mongoose = require("mongoose");

var tipSchema = new mongoose.Schema({
    name: String,
    rate: String,
    image: String,
    input: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Tip", tipSchema);
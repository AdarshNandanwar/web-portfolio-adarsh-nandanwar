var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    mobilenumber: String,
    email: String,
    content: String
});

module.exports = mongoose.model("Message", messageSchema);
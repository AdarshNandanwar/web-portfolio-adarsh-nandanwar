var mongoose  =require("mongoose");

var projectSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    link: String
});

module.exports = mongoose.model("Project", projectSchema);
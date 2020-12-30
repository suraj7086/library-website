var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/library_data");

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text:String,
    author:String
});

module.exports = mongoose.model("comment",commentSchema);
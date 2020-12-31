var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentschema = new Schema({
    title:String,
    author : String
});
 module.exports = mongoose.model("Comment",commentschema);
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/library_data");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user : String,
    email: String
});

module.exports = mongoose.model("user",UserSchema);
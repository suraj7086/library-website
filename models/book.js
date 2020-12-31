var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bookschema = new Schema({
    bookname : String,
    bookauthor : String,
    bookdepartment: String,
    bookcover: String,
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model('book',bookschema);

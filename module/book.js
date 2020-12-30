var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/library_data");

var Schema = mongoose.Schema;

var bookSchema = new Schema({

    book_name:String,
    book_cover:String,
    book_author:String,
    book_department:String,
    comments: [
      {
        type : Schema.Types.ObjectId,
          ref: "book"
      }
    ]
});

module.exports = mongoose.model("book_model",bookSchema);
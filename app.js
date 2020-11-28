var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static("public"));

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/library_data");

var Schema = mongoose.Schema;

var bookSchema = new Schema({

    book_name:String,
    book_cover:String,
    book_author:String,
    book_department:String

});

var book = mongoose.model("book_model",bookSchema);

// book.create({
//        book_name:"computer Networking",
//        book_cover:"https://images-na.ssl-images-amazon.com/images/I/71RanAYLvqL.jpg",
//        book_author:"Forouzan",
//        book_deparment:"computer Science"
// },function(err,book){
//     if(err){
//         console.log("book is not created");
//     }
//     else{
//         console.log(book);
//     }
// });

app.get("/",function(req,res){
    book.find({},function(err,allbook){
        if(err){
            console.log("unable to find books");
        }
        else{
            res.render("index",{books:allbook});
        }
    });
});

app.get("/addnewbook",function(req,res){
    res.render("newbook");
});

app.post("/addnewbook",function(req,res){
    var bkname = req.body.bookname;
    var bkauthor = req.body.bookauthor;
    var bkdepartment = req.body.bookdepartment;
    book.create({
        book_name: bkname,
        book_author:bkauthor,
        book_department:bkdepartment,
        book_cover:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105"
    });
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("server started");
});
var express = require("express");
var app = express();

var methodOverride = require("method-override");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

// app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

app.use(methodOverride("_method"));

var book = require("./module/book");

var user = require("./module/users");

var comment = require("./module/comments");

var seedDB = require("./seeds.js");

seedDB();

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
    res.redirect("/books");
});

app.get("/books",function(req,res){
    book.find({},function(err,allbook){
        if(err){
            console.log("unable to find books");
        }
        else{
            res.render("index",{books:allbook});
        }
    });
});
// new book form
app.get("/books/new",function(req,res){
    res.render("newbook");
});
// add new book
app.post("/books",function(req,res){
    var bkname = req.body.bookname;
    var bkauthor = req.body.bookauthor;
    var bkdepartment = req.body.bookdepartment;
    book.create({
        book_name: bkname,
        book_author:bkauthor,
        book_department:bkdepartment,
        book_cover:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105"
    });
    res.redirect("/books");
});

// show books
app.get("/books/:id",function(req,res){
   book.findById(req.params.id,function(err,foundbook){
    if(err){
        res.send("Book is not available");
    }
    else{
        res.render("show",{book:foundbook});
    }
   });
});

// edit the file details
app.get("/books/:id/edit",function(req,res){
    book.findById(req.params.id,function(err,foundbook){
        if(err){
            console.log("unable to find the book");
        }
        else{
            res.render("edit",{book:foundbook});
        }
    })
});

// updating new values
app.put("/books/:id",function(req,res){
    var bookname = req.body.book_name;
    var bookauthor = req.body.book_author;
    var bookdepartment = req.body.book_department;
    var bookbody = {
        bookname,bookauthor,bookdepartment
    };
    console.log("bookbody");
    book.findByIdAndUpdate(req.params.id,bookbody,function(err,foundbook){
        if(err){
            res.send("unable to update details");
        }
        else{
            res.redirect("/books/"+ req.params.id);
        }
    });
});
// deleting the books

app.delete("/books/:id",function(req,res){
    book.findByIdAndRemove(req.params.id,function(err)
    {
        if(err){
            res.send("unable to delete the book");
        }
        else{
            res.redirect("/books");
        }
    })
});

app.listen(3000,function(){
    console.log("server started");
});
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var methodOverride = require("method-override");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

// app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

app.use(methodOverride("_method"));

var book = require("./models/book");
var Comment = require("./models/comments");
var seedDB = require("./seeds.js");
const comments = require("./models/comments");

seedDB();
mongoose.connect('mongodb://localhost/librarydata');

app.get("/",function(req,res){
    res.redirect("/books");
});

app.get("/books",function(req,res){
    book.find({},function(err,allbook){
        if(err){
            console.log("unable to find books");
        }
        else{
            res.render("books/index",{books:allbook});
        }
    });
});

// new book form
app.get("/books/new",function(req,res){
    res.render("books/newbook");
});

// add new book
app.post("/books",function(req,res){
    var bkname = req.body.bookname;
    var bkauthor = req.body.bookauthor;
    var bkdepartment = req.body.bookdepartment;
    book.create({
        bookname: bkname,
        bookauthor:bkauthor,
        bookdepartment:bkdepartment,
        bookcover:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105"
    });
    res.redirect("/books");
});

// show books
app.get("/books/:id",function(req,res){
    book.findById(req.params.id).populate("comments").exec(function(err,foundbook){
    if(err){
        res.send(err);
    }
    else{
        res.render("books/show",{book:foundbook});
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
            res.render("books/edit",{book:foundbook});
        }
    })
});

// updating new values
app.put("/books/:id",function(req,res){
    var bookname = req.body.bookname;
    var bookauthor = req.body.bookauthor;
    var bookdepartment = req.body.bookdepartment;
    var bookbody = {
        bookname,bookauthor,bookdepartment
    };
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

//creating comments
app.get("/books/:id/comments/new",function(req,res){
    book.findById(req.params.id,function(err,book){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{book:book});
        }
    })
    
});

app.post("/books/:id/comments",function(req,res){
    book.findById(req.params.id,function(err,book){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.Comment,function(err,newcomment){
                if(err){
                    console.log(err);
                }
                else{
                    book.comments.push(newcomment);
                    book.save();
                    res.redirect("/books/"+ req.params.id);
                }
            });
        }
    });
});

app.listen(3000,function(){
    console.log("server started");
});
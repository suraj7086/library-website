var mongoose = require("mongoose");

var book = require("./models/book.js");
var Comment = require("./models/comments");

var data = [
{ bookname:"Highjacking",
  bookauthor:"Singh",
  bookdepartment: "Computer Science",
  bookcover: "https://www.interfacemedia.com/media/2350/img-vr-tilt-brush-website-hero-shot.jpg"
},
{ bookname:"Highjacking",
  bookauthor:"Singh",
  bookdepartment: "Computer Science",
  bookcover: "https://www.interfacemedia.com/media/2350/img-vr-tilt-brush-website-hero-shot.jpg"
},
{ bookname:"Highjacking",
  bookauthor:"Singh",
  bookdepartment: "Computer Science",
  bookcover: "https://www.interfacemedia.com/media/2350/img-vr-tilt-brush-website-hero-shot.jpg"
}];

function seedDB(){
// removing all books
book.remove({},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("books are removed");
        //adding books
        data.forEach(function(seed){
            book.create(seed,function(err,onebook){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(onebook);
                    Comment.create({
                        title:"this is very good book for beginner",
                        author: "Lankapati Singh"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }
                        else{
                            onebook.comments.push(comment);
                            onebook.save();
                            console.log("comment add");
                        }
                    });
                }
            });
        });
    }
});
}
module.exports = seedDB;
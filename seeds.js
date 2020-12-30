var mongoose = require("mongoose");
var book = require("./module/book");
var comment = require("./module/comments");


var data = [

   { book_name: "computer networking",
    book_author: "forouzan",
    book_department: "computer Science",
    book_cover: "https://images-na.ssl-images-amazon.com/images/I/71gfvWeTAiL.jpg",
   },
   { book_name: "Linux",
    book_author: "Suraj",
    book_department: "computer Science",
    book_cover: "https://images-na.ssl-images-amazon.com/images/I/71gfvWeTAiL.jpg",
   },
   { book_name: "Math",
    book_author: "RD",
    book_department: "computer Science",
    book_cover: "https://images-na.ssl-images-amazon.com/images/I/71gfvWeTAiL.jpg",
   },
   { book_name: "C++",
    book_author: "SHIVAM",
    book_department: "computer Science",
    book_cover: "https://images-na.ssl-images-amazon.com/images/I/71gfvWeTAiL.jpg",
   },
   { book_name: "computer networking",
    book_author: "forouzan",
    book_department: "computer Science",
    book_cover: "https://images-na.ssl-images-amazon.com/images/I/71gfvWeTAiL.jpg",
   }
]

function seedDB(){
   // remove all books
    book.remove({},function(err){
        if(err)
        {
            console.log(err);
    
        }
        console.log("books are removed");
 // adding new books
        data.forEach(function(seed){
            book.create(seed,function(err,books){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("add a book");
                    //create a comment 
                    comment.create({
                        
                        title : "this book is very good for begineers and they can easily understand the concept of networking.",
                        author: "suraj"
                    },function(err,newcomment){
                        if(err){
                            console.log(err);
                        }
                        else{
                             books.comments.push(newcomment);
                             books.save();
                            console.log("book added with comment");
                        }
                    });
                }
            })
        });
    });
   
}
    

module.exports = seedDB; 
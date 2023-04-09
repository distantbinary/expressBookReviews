const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let userLength=users.length;
    for (let num=0; num<userLength; user++){
        if (users[num]["username"]===username && users[num]["password"]===password){
            //username and password matched!
        }
        else {
            //user name and/or password don't match!
        }
    }
}





let userLength=users.length;

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here

const username = req.body.username;
const password = req.body.password;
res.send(users.length.toString());
//   return res.status(404).json({message: "No username or password provided."});
//   return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

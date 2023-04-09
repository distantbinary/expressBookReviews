const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
}


public_users.post("/register", (req,res) => {//register new user
    const username = req.body.username;
    const password = req.body.password;
    
    if (username && password) {
        if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
        } else {
        return res.status(404).json({message: "User already exists!"});    
        }
    } 
    return res.status(404).json({message: "No username or password provided."});
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));

  //return res.status(300).json({message: "Yet to be implemented"});
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;
  res.send(books[isbn]);

});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  const author = req.params.author;
  const result= {};

  for (let num in books) {
    if (books[num]['author'] === author){
        result[num]=books[num];
    }
  }
  res.send(result);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  const title = req.params.title;
  const result= {};

  for (let num in books) {
    if (books[num]['title'] === title){
        result[num]=books[num];
    }
  }
  res.send(result);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

module.exports.general = public_users;

const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    if (typeof username === 'undefined' || username.trim() === '') {
        // username is undefined or empty string, return false
        return false;
    }
    else{
        return true;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let userLength=users.length;
    for (let num=0; num<userLength; num++){
        if (users[num]["username"]===username && users[num]["password"]===password){
            return true;
        }
    }
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
//Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (!isValid(username)){
        return res.status(404).json({message: "Username is not valid."});
    }

    if (authenticatedUser(username, password)){
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 });
    
        req.session.authorization = {
            accessToken,username
        }
        return res.status(200).send("User successfully logged in");
    }
    else {
        return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
//Write your code here
    const isbn = req.params.isbn;
    const user = req.session.authorization["username"];
    const review = req.body.review;

    let filtered_book = books[isbn]
    if (filtered_book) {
        if(review) {
            filtered_book['reviews'][user] = review;
            books[isbn] = filtered_book;
        }
        res.send(`The review for the book with ISBN  ${isbn} has been added/updated.`);
    }
    else{
        res.send("Unable to find this ISBN!");
    }
});

//Delete user's book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const user = req.session.authorization["username"];
    let filtered_book = books[isbn]
    if (filtered_book) {
        delete filtered_book['reviews'][user];
        res.send(`User ${user}'s review for the book with ISBN ${isbn} has been deleted.`);
    }
    else{
        res.send("Unable to find this ISBN!");
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

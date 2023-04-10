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
    res.send(JSON.stringify(req.session.authorization["username"], null, 4));
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

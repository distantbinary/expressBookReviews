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
public_users.get('/', async function (req, res) {
    try {
        const get_books = await new Promise((resolve, reject) => {
            resolve(JSON.stringify(books, null, 4));
        });
        res.send(get_books);
    } catch (err) {
        console.error(err);
        res.send("Cannot retrieve data");
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const get_isbn = new Promise((resolve, reject) => {
        resolve(res.send(books[isbn]));
    });
    get_isbn.then(() => console.log("Promise for getting isbn resolved"));
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const result= {};

    const get_author = new Promise((resolve, reject) => {
        for (let num in books) {
            if (books[num]['author'] === author){
                result[num]=books[num];
            }
        }
        resolve(res.send(result));
    });
    get_author.then(() => console.log("Promise for getting author resolved"));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const result= {};

    const get_title = new Promise((resolve, reject) => {
        for (let num in books) {
            if (books[num]['title'] === title){
                result[num]=books[num];
            }
        }
        resolve(res.send(result));
    });
    get_title.then(() => console.log("Promise for getting book title resolved"));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
});

module.exports.general = public_users;

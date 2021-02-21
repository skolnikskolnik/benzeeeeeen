const db = require("../models");

const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

let apiURL = "https://www.googleapis.com/books/v1/volumes?q=";
const API_KEY = process.env.REACT_APP_API_KEY;

module.exports = {
    //Google books search API
    findBySearch: function (req, res) {

        let searchTerm = req.params.search;

        apiURL += searchTerm;
        apiURL += "&printType=books&key=";
        apiURL += API_KEY;

        fetch(apiURL).then(result => {
            apiURL = "https://www.googleapis.com/books/v1/volumes?q=";
            return result.json();
        }).then(response => res.json(response))
    },

    //Gets all books from the db
    findAll: function(req, res) {
        db.Book
          .find(req.query)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },

      //Finds a book by its id
    findById: function (req, res) {
        db.Book
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    //Creates a new book in the db
    create: function (req, res) {
        db.Book
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    
    //Removes a book from the db - why isn't this function working
    remove: function (req, res) {
        db.Book
            .findById({ _id: req.params.search })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}
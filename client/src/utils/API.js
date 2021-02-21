import axios from "axios";


export default {
    getBookBySearch: function (search) {
        return axios.get("/api/books/" + search);
    },
    // Gets the book with the given id
    getBook: function (id) {
        return axios.get("/api/books/" + id);
    },
    // Gets all books
    getBooks: function () {
        return axios.get("/api/books/");
    },
    // Deletes the book with the given id
    deleteBook: function (id) {
        return axios.delete("/api/books/" + id);
    },
    // Saves a book to the database
    saveBook: function (bookData) {
        return axios.post("/api/books/", bookData);
    }

}


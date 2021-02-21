const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  author: { type: String, required: true },
  image: { type: String},
  title: { type: String, required: true },
  index: Number,
  synopsis: String,
  url: { type: String, required: true }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
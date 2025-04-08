const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookname: { type: String, required: true },
  authers: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  photo: { type: String },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
 
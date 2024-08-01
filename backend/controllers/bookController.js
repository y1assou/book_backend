const Book = require('../models/Book');
const mongoose = require('mongoose');

// Create a new book
exports.createBook = async (req, res) => {
    const { image, title, description, category, author, favorite } = req.body;

    const book = new Book({
        image: `data:${image.contentType};base64,${image.data}`, // Save as full Base64 string
        title,
        description,
        category,
        author,
        favorite: favorite || false,
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books); // Return books with image data as Base64 strings
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};





// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    image: String, // Storing Base64 string
    title: String,
    description: String,
    category: String, 
    author: String,  
    favorite: { type: Boolean, default: false },
});

module.exports = mongoose.model('Book', bookSchema);


const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    BookID: { type: String, required: true, unique: true },
    Title: { type: String, required: true },
    Price: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    PublicationYear: { type: Number, required: true },
    PublisherID: { type: String, required: true },
    Author: { type: String, required: true }
});

module.exports = mongoose.model('Book', bookSchema);
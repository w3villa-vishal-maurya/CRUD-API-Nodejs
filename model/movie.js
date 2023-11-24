const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    },
    year: {
        type: String,
        required: true,
    },
    genre: {
        type: [String],  // This indicates an array of strings
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
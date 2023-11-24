const mongoose = require("mongoose");

const connectConfig = ()=>{
    mongoose.connect(process.env.CONFIG_URL)
    .then((e)=>{
        console.log(`Connect to mongoDb: ${e.connection.host}`);
    })
    .catch((e)=>{
        res.send(e);
    })
}

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

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true, 
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model("user", userSchema);

module.exports = {
    connectConfig,
    Movie,
    User
}
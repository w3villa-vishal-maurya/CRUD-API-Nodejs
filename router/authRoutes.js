const express = require("express");
const { connectConfig, Movie, User } = require("../db/connection");
const { getReq, postReq, putReq, deleteReq } = require("../controller/controller");
const route = express.Router();

route.get("/auth/profile", (req, res)=>{
    console.log(req.user);
    return res.send("Hello, This is your profile.");
});


module.exports = route;
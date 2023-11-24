const express = require("express");
const { connectConfig, Movie, User } = require("../db/connection");
const { getReq, postReq, putReq, deleteReq } = require("../controller/controller");
const jwt = require("jsonwebtoken");
const route = express.Router();

const authenticatedUser = async (username, password, email) => {
    try {
        const user = await User.find({ username: username });
        if (username === user.username && password === user.password && email === user.email) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        return res.send(error);
    }
}

route.get("/", (req, res) => {
    res.send("Hello authenticated user!!!");
});


route.get("/login", (req, res) => {
    res.send("Hello authenticated user!!!");
});


route.post("/login", async(req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    console.log(username, email, password);

    if (!username || !password || !email) {
        return res.status(404).json({ message: "Error logging in." })
    }

    if(authenticatedUser(username, email, password)){
        let accessToken = jwt.sign({
            data : password
        }, "secret", {expiresIn : 60});

        req.session.autherization = {
            accessToken, username
        };

        return res.status(200).send("User successfully logged In!");
    }
    else{
        return res.status(408).send("Invalid login! Check user details!!!");
    }
});


route.get("/auth/profile", (req, res)=>{
    console.log(req.user);
    return res.send("Hello, This is your profile.");
});


route.post("/auth/addmovie", postReq);

route.put("/auth/update/:id", putReq);

route.delete("/auth/delete/:id", deleteReq);



module.exports = route;
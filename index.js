const http = require("http");
const env = require("dotenv").config();
const express = require("express");
const { connectConfig, Movie, User } = require("./db/connection");
const auth_user = require("./router/authRoutes");
const public_users = require("./router/general");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const session = require("express-session");

const app = express();

const PORT = 3000 || process.env.PORT;

connectConfig();

app.use(bodyParser.json());
app.use(express.json());

app.use("/customer", session({secret: "secret", resave: true, saveUninitialized: true}));

app.use("/customer/auth/*", function auth(req, res, next){
    console.log("hello!!");
    if(req.session.autherization){
        token = req.session.autherization["accessToken"];
        jwt.verify(token, "secret", (err, user)=>{
            if(!err){
                req.user = user;
                next();
            }
            else{
                return res.status(403).json({message : "User is not authorized"});
            }
        })
    }
    else{
        return res.status(403).json({message: "User not logged In."})
    }
});

app.use("/customer", auth_user);
app.use("/", public_users);

app.listen(PORT, () => {
    console.log("You are listening the port: ", PORT);
});
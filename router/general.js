const express = require("express");
const route = express.Router();
const { getReq, postReq, putReq, deleteReq } = require("../controller/controller");
const {User } = require("../db/connection");

route.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.find(req.body);

        if(user) {
            res.status(404).json({message : "User already exists!!!"});
        }

        const newUser = await User.create(req.body);

        res.status(200).json({message : "User Successfully registered!! You can login!"});
    }
    catch (error) {
        res.send(error);
    }
});

route.get("/url/*", getReq);



module.exports = route;
const http = require("http");
const env = require("dotenv").config();
const express = require("express");
const { connectConfig, Movie, User } = require("./db/connection");
const auth_user = require("./router/authRoutes");
const public_users = require("./router/general");
const bodyParser = require('body-parser');
const session = require("express-session");

const app = express();

const PORT = 3000 || process.env.PORT;

connectConfig();

app.use(bodyParser.json());
app.use(express.json());

app.use("/customer", auth_user);
app.use("/", public_users);

app.listen(PORT, () => {
    console.log("You are listening the port: ", PORT);
});
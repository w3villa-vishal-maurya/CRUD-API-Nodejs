const http = require("http");
const env = require("dotenv").config();
const {getReq, postReq, putReq, deleteReq} = require("./controller/controller");
const movies = require("./data/movie.json");

const PORT = process.env.PORT || 3000;

const app = http.createServer((req, res) => {
    req.movies = movies;
    switch (req.method) {
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "PATCH":
            patchReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader = ("Content-type", "application/json");
            res.write({title:"Not found!", message:"Route not found."});
            res.end();
            break;
    }
});

app.listen(PORT, () => {
    console.log("You are listening the port: ", PORT);
});
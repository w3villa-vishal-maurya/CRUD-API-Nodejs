const bodyParser = require("../utils/body-parser")
const crypto = require("crypto");
var mongodb = require('mongodb');
const Movie = require("../model/movie");
const User = require("../model/user");

const regexV4 = new RegExp(/^[0-9a-fA-F]{24}$/);

const getReq = async (req, res) => {
    url = req.url.substring(0, req.url.lastIndexOf("/"));
    const id = req.url.substring(req.url.lastIndexOf("/") + 1);
    console.log(id);

    if (url == "/url/movies" && id !== null) {
        if (!regexV4.test(id)) {
            res.statusCode = 400;
            res.write(
                JSON.stringify(
                    {
                        title: "Validation failed",
                        message: "UUID in not found!"
                    }
                )
            );

            res.end();
        } else {
            const filterData = await Movie.findById(id);
            if (filterData) {
                res.statusCode = 200;
                res.write(JSON.stringify({ "movies": filterData }));
                res.end();
            }
            else {
                res.statusCode = 404;
                res.write(JSON.stringify({ title: "Not found", mesage: "Movie not found!" }));
                res.end();
            }
        }
    }
    else if (req.url == "/url/movies") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        Movie.find({})
            .then(data => {
                const response = {
                    movies: data.length > 0 ? data : "[]"
                };
                res.end(JSON.stringify(response));
            })
            .catch(error => {
                console.error(error);
                res.status(500).end(JSON.stringify({ error: 'Internal Server Error' }));
            });
    }
    else {
        res.statusCode = 404;
        res.write(
            JSON.stringify({ title: "Not found", message: "Route not found!" })
        );
        res.end();
    }
}

async function postReq(req, res) {
    try {
        console.log(req.body);
        const result = await Movie.create(req.body);
        console.log(result);
        res.writeHead(201, { "Content-Type": "Application/json" });
        res.end();

    }
    catch (err) {
        console.log(err);
        res.writeHead(400, { "Content-Type": "Application/json" });
        res.end(
            JSON.stringify({
                title: "Validation Failed",
                message: "Data is not valid!"
            })
        );
    }

}

async function putReq(req, res) {
    try {
        const id = req.params.id;

        const filter = { _id: new mongodb.ObjectId(id) };
        const update = { title: req.body.title, rating: req.body.rating };

        const result = await Movie.findByIdAndUpdate(filter, update);
        if (result) {
            res.writeHead(201, { "Content-Type": "Application/json" });
            res.end();
        }
        else {
            res.statusCode = 404;
            res.write(
                JSON.stringify({ title: "Not found", message: "Record does not exists!" })
            );
            res.end();
        }
    }
    catch (err) {
        console.log(err);
        res.writeHead(400, { "Content-Type": "Application/json" });
        res.end(
            JSON.stringify({
                title: "Validation Failed",
                message: "Data is not valid!"
            })
        );
    }
}


async function deleteReq(req, res) {
    const id = req.params.id;
    console.log(id);

    if (!regexV4.test(id)) {
        res.statusCode = 400;
        res.write(
            JSON.stringify(
                {
                    title: "Validation failed",
                    message: "UUID in not found!"
                }
            )
        );

        res.end();
    }
    else if (id !== null) {
        console.log(id);
        const result = await Movie.deleteOne({ _id: new mongodb.ObjectId(id) });
        console.log(result);
        if (result.deletedCount > 0) {
            res.statusCode = 200;
            res.write(JSON.stringify({ title: "Successfull", mesage: "Movie has been removed!" }));
            res.end();
        }
        else {
            res.statusCode = 400;
            res.write(JSON.stringify({ title: "Successfull", mesage: "Movie not found!" }));
            res.end();
        }
    }
    else {
        res.statusCode = 404;
        res.write(JSON.stringify({ title: "Not found", mesage: "Movie not found!" }));
        res.end();
    }


}


module.exports = {
    getReq,
    postReq,
    putReq,
    deleteReq
}
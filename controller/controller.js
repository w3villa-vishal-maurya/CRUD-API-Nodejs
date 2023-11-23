const bodyParser = require("../utils/body-parser")
const crypto = require("crypto");

const regexV4 = new RegExp(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);

function getReq(req, res) {
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
            const filterData = req.movies.filter((movie) => {
                if (movie.id === id) {
                    return movie;
                }
            })

            if (filterData.length > 0) {
                res.statusCode = 200;
                res.write(JSON.stringify({ "movies": filterData[0] }));
            }
            else {
                res.statusCode = 404;
                res.write(JSON.stringify({ title: "Not found", mesage: "Movie not found!" }));
            }
        }
    }
    else if (req.url == "/url/movies") {
        res.statusCode = 200;
        res.write(JSON.stringify({ "movies": req.movies }));
    }
    else {
        res.statusCode = 404;
        res.write(
            JSON.stringify({ title: "Not found", message: "Route not found!" })
        );
    }
    res.end();
}

async function postReq(req, res) {
    try {
        let body = await bodyParser(req);
        body.id = crypto.randomUUID();
        req.movies.push(body);
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
        let body = await bodyParser(req);
        const index = req.movies.findIndex((movie) => movie.id === body.id);
        console.log(index);
        if (req.url == "/url/movies") {
            if (index >= 0) {
                req.movies[index] = body;
                res.writeHead(201, { "Content-Type": "Application/json" });
                res.end();
            }
            else{
                throw new Error;
            }
        }
        else{
            res.statusCode = 404;
            res.write(
                JSON.stringify({ title: "Not found", message: "Route not found!" })
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


function deleteReq(req, res) {
    url = req.url.substring(0, req.url.lastIndexOf("/"));
    const id = req.url.substring(req.url.lastIndexOf("/") + 1);

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
    else if (url == "/url/movies" && id !== null) {
        const index = req.movies.findIndex((movie) => movie.id === id);
        console.log(index);

        const filterData = req.movies.filter((movie) => movie.id !== id);
        req.movies.splice(index, 1);
        console.log(req.movies);
        res.statusCode = 200;
        res.write(JSON.stringify({ title: "Successfull", mesage: "Movie has been removed!" }));
        res.end();
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
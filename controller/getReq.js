module.exports = (req, res) => {
    if (req.url == "/url/movies") {
        res.statusCode = 200;
        res.write("Hello from the get req...");
    }
    else {
        res.statusCode = 404;
        res.write(
            JSON.stringify({ title: "Not found", message: "Route not found!" })
        );
    }
    res.end();
}

module.exports = (req, res) => {
    if (req.url == "/url/movies") {
        res.statusCode = 200;
        res.write("Hello from the get req...");
    }
    else {
        res.statusCode = 404;
        res.write(
            JSON.stringify({ title: "Not found", message: "Route not found!" })
        );
    }
    res.end();
}

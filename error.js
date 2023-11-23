// const error = new Error("Someting went wrong!");
// console.log(error.message);
// throw error

// const CustomError = require("./CustomError");
// const error = new CustomError("Hello, I am an custom error");
// console.log(error);

function doSomething() {
    // const data = fetch("localhost:3000/api");
    console.log("Hello, How are you!");
}

// Uncaught exception
process.on("uncaughtException", (err) => {
    console.log("There is an uncaught exception", err);
    process.exit(1);
})

// doSomething();

// callback Function    

console.log("Hello, task start");

function asyncTask(cb) {
    console.log("Task is running..");
    setTimeout(() => {
        cb(null, "Hello!");
    }, 0);
}

asyncTask((err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("data", data);
    }
});
console.log("Task is end");
const name = "Vishal";

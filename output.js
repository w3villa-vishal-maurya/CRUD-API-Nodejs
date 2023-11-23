const ProgressBar = require("progress");
const bar = new ProgressBar("downloading [:bar] :rate/bps :percent :eats", {
    total: 20,
})

const timer = setInterval(()=>{
    bar.tick();
    if (bar.complete){
        clearInterval(timer);
    }
}, 100)
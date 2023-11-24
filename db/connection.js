const mongoose = require("mongoose");

const connectConfig = ()=>{
    mongoose.connect(process.env.CONFIG_URL)
    .then((e)=>{
        console.log(`Connect to mongoDb: ${e.connection.host}`);
    })
    .catch((e)=>{
        res.send(e);
    })
}

module.exports = {
    connectConfig
}
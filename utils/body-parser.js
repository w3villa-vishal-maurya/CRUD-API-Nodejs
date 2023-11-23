async function bodyParser(request){
    return new Promise((resolve, reject)=>{
        try{
            let body = "";
            request.on("data", (chunk)=>{
                body += chunk;
            })

            request.on("end", ()=>{
                resolve(JSON.parse(body));
            })
        }
        catch(err){
            reject(err);
        }
    })
}

module.exports = bodyParser;
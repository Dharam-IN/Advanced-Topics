const cluster = require('cluster');
const os = require('os');
const express = require('express');

const totalCPUs = os.cpus().length
// console.log(totalCPUs)

if(cluster.isPrimary){
    for(let i = 0; i < totalCPUs; i++){
        cluster.fork();
    }
}else{
    const app = express()
    const port = 9000;

    app.get("/", (req, res) => {
        res.json({
            message: `Hello from Server ${process.pid}`
        })
    })

    app.listen(port, () => console.log("Server is running"))
}

const express = require('express')
const app = express();
const fs = require('fs');
const status = require("express-status-monitor")

app.use(status());

app.get("/" , (req, res) => {
    const stream = fs.createReadStream('./sample.txt', 'utf-8');
    stream.on("data", (chunk) => res.write(chunk));
    stream.on("end", () => res.end())
})

app.listen(9000, () => console.log(`Server running on 9000`));1
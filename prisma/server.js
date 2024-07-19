import express from 'express'
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 8001;

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) =>{
    res.send("Hello From Server!");
})

// ROUTES
import routes from './routes/index.js'
app.use(routes)

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
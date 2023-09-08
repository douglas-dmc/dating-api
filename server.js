import express from "express"
import mongoose from "mongoose"
import "dotenv/config"

const user = process.env.DB_USER
const password = process.env.DB_PW
const porta = process.env.PORT

// App Config
const app = express()
const port = porta || 8001
const connection_url =
    `mongodb+srv://${user}:${password}@cluster0.czssres.mongodb.net/?retryWrites=true&w=majority`

// Middleware

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello Node"))

app.listen(port, () => console.log(`Running on localhost: ${port}`))

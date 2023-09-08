import express from "express"
import mongoose from "mongoose"
import Cors from "cors"
import Cards from "./dbCards.js"
import "dotenv/config"

// Variaveis de Ambiente
const user = process.env.DB_USER
const password = process.env.DB_PW
const porta = process.env.PORT

// App Config
const app = express()
const port = porta || 8001
const connection_url = `mongodb+srv://${user}:${password}@cluster0.czssres.mongodb.net/?retryWrites=true&w=majority`

// Middleware
app.use(express.json())
app.use(Cors())

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello Node"))

app.post("/dating/cards", async (req, res) => {
    const dbCard = req.body

    try {
        await Cards.create(dbCard)
        return res.status(201).send({ message: "Card Cadastrado!" })
    } catch (error) {
        return res.status(500).send({ message: "Card Não Cadastrado!" })
    }
})

app.get("/dating/cards", async (req, res) => {
    try {
        const data = await Cards.find()
        return res.status(200).send(data)
    } catch (error) {
        return res.status(500).send({ message: "Erro de Leitura!" })
    }
})

// Listener
app.listen(port, () => console.log(`Running on localhost: ${port}`))

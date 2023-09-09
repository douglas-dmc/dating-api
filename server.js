import express from "express"
import mongoose from "mongoose"
import Cors from "cors"

import swaggerUI from "swagger-ui-express"
import swaggerjsDoc from "swagger-jsdoc"

import Cards from "./dbCards.js"

import "dotenv/config"

// Variaveis de Ambiente
const url = process.env.URL
const porta = process.env.PORT

// App Config
const app = express()
const port = porta || 8001
const connection_url = url

// swagger
const swaggerAPIDesc = swaggerjsDoc({
    swaggerDefinition: {
        info: {
            title: "API dating",
            cersion: "1.0.0"
        }
    },
    apis: ["server.js"]
})

const options = {
    customCss: '.swagger-ui .topbar { display: none }'
}

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerAPIDesc, options))

// Middleware
app.use(express.json())
app.use(Cors())

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Bem-vindo a API dating"))

/**
* @swagger
* /dating/cards:
*   post:
*     description: Criando Cards
*     requestBody:
*       content: 
*         application/json
*     responses:
*       201:
*         description: Card Cadastrado!
*       500:
*         description: Card Não Cadastrado!
*     parameters:
*       - name: name
*         in: application/json
*         required: true
*         type: string
*         description: nome do card
*       - name: imgUrl
*         in: application/json
*         required: true
*         type: string
*         description: url da imagem
*/
app.post("/dating/cards", async (req, res) => {
    const dbCard = req.body

    try {
        await Cards.create(dbCard)
        return res.status(201).send({ message: "Card Cadastrado!" })
    } catch (error) {
        return res.status(500).send({ message: "Card Não Cadastrado!" })
    }
})

/**
* @swagger
* /dating/cards:
*   get:
*     description: Listando os Cards
*     responses: 
*       200:
*         description: Sucesso
*       500:
*         description: Servidor Não Encontrado
*/
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

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
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API dating desenvolvida em Node.js e Express",
            version: "1.0.0",
            description: "Uma simples API para o app dating-app-mern",
            contact: {
                name: "Douglas M Costa",
                email: "douglasmarques37@gmail.com",
            },
        },
    },
    apis: ["server.js"],
}

const swaggerDocs = swaggerjsDoc(swaggerOptions)
console.log(swaggerDocs)

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

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
 * components:
 *   schemas:
 *     cards:
 *       type: object
 *       required:
 *         - name
 *         - imgUrl
 *       properties:
 *         name:
 *           type: string
 *           default: João Carlos
 *         imgUrl:
 *           type: string
 *           default: http://localdaimagem
 *     cardsResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         imgUrl:
 *           type: string
 */

/**
 * @swagger
 * /dating/cards:
 *    post:
 *      summary: Criando Cards
 *      description: Rota para criar um card
 *      tags:
 *        - Cards
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/cards'
 *      responses:
 *        201:
 *          description: Card Cadastrado!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/cardsResponse'
 *        500:
 *          description: Card Não Cadastrado!
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
 *     summary: Listando os Cards
 *     description: Rota para listar todos os Cards
 *     tags:
 *       - Listagem
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

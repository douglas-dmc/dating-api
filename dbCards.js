import mongoose from "mongoose"

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
})

const cards = mongoose.model("cards", cardSchema)

export default cards
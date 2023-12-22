import { DATABASE_URL } from "./config.js"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import {routes} from "./routes/routes.js"
const port = 5555

const bookRoutes = routes

const mongoURL = DATABASE_URL

const app = express()

mongoose.connect(mongoURL)
const database = mongoose.connection

app.use(express.json())

app.use(cors())
/*
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))
*/
app.get('/', (req, res) => {
    return res.status(234).send("YOU'RE A PINBALL WIZARD HARRY!")
})

app.use('/books', bookRoutes)

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', (req, res) => {
    console.log('Database Connected')
    app.listen(port, () => {
        console.log(`Server started at ${port}`)
    })
})

//app.use(cors())






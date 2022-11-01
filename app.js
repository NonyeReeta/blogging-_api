require('dotenv').config()
const express = require('express')
const {connectToDb} = require("./db")

const app = express()
const PORT = process.env.PORT || 8080

//  CONNECTING TO DATABASE INSTANCE
connectToDb()

app.use(express.json())

app.get('/',(req, res, next) => {
    res.send('home page')
})

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});
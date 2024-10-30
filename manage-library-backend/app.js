const express = require('express')
const cors = require('cors')
const morgan = require("morgan")
const path = require("path")


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("combined"))

app.get('/', (req, res) => {
    res.status(200).send('Welcome to manage book application')
})

module.exports = app
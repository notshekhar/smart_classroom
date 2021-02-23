const express = require("express")
const cors = require("cors")

const logger = require("morgan")

const { errorHandler } = require("./error")

const app = express()


app.use(cors(), express.json({ limit: "1mb" }), logger("dev"))

const students = require("./routers/students")

app.use("/", students)

app.use(errorHandler)
module.exports = app

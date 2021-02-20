const express = require("express")
const cors = require("cors")

// const cookieParser = require("cookie-parser")
const logger = require("morgan")

const { errorHandler } = require("./error")
const loginHandle = require("./handles/login")
const authHandle = require("./handles/auth")

const app = express()

app.use(cors(), express.json({ limit: "1mb" }), logger("dev"))

app.get("/login", loginHandle)
app.get("/auth", authHandle)

app.use(errorHandler)
module.exports = app

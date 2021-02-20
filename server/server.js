const app = require("./serverJS/app")
const socketio = require("socket.io")
const socketHandler = require("./serverJS/socketHandler.js")

require("dotenv").config()

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`listening to port -> ${server.address().port}`)
})

const io = socketio(server)
io.on("connection", socketHandler)

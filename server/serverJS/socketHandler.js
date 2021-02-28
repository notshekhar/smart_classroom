const { branches } = require("./db")

function socketHandler(s) {
    s.on("join-room", (uid, branch_id) => {
        s.join(branch_id)
        s.join(uid)
        console.log(uid, "-> joined the room", branch_id)
        s.on("class_attend", (uid, subjectCode) => {})
    })
}

module.exports = socketHandler

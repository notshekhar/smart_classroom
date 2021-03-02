const s_handle = require("./student_handles/student_socket")

function socketHandler(s) {
    s.on("join-room", (uid, branch_id) => {
        s.join(branch_id)
        s.join(uid)
        console.log(uid, "-> joined the room", branch_id)
        s_handle(s, uid, branch_id)
    })
}

module.exports = socketHandler

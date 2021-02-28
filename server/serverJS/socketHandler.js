const { attendance } = require("./db")

function socketHandler(s) {
    s.on("join-room", (uid, branch_id) => {
        s.join(branch_id)
        s.join(uid)
        console.log(uid, "-> joined the room", branch_id)
        s.on("class_attend", async (uid, subjectCode) => {
            let res = await attendedClass(uid, subjectCode)
        })
    })
}

async function attendedClass(uid, subjectCode) {
    try {
        let attended = await attendance.findOne({
            uid,
            subjectCode,
            date: new Date().toDateString(),
        })
        if (!attended) {
            let att = await attendance.insert({
                subjectCode,
                uid,
                date: new Date().toDateString(),
            })
            return { attended: true, subjectCode, uid }
        }
        return { attended: true, subjectCode, uid }
    } catch (err) {
        return { attended: false }
    }
}

module.exports = socketHandler

const { attendance, branches } = require("../db")
const { auth } = require("../auth")

function s_handle(s, uid, branch_id) {
    s.on("class_attend", async ({ token, subjectCode }) => {
        // console.log(uid, token, subjectCode)
        //auth the user
        try {
            let a = await auth(token)
            if (!a.auth) {
                s.emit("class_attend_response", {
                    attended: false,
                    message: "You are not autharized re-login ",
                })
            } else {
                let att = await attendedClass(uid, subjectCode)
                if (att.attended) {
                    s.emit("class_attend_response", {
                        attended: true,
                        subjectCode,
                    })
                    s.to(branch_id).broadcast.emit("new_attendance", {
                        subjectCode,
                        user: {
                            uid,
                            photo_url: false,
                        },
                    })
                }
            }
        } catch (err) {
            s.emit("class_attend_response", {
                attended: false,
                message: err.message,
            })
        }
        // if auth
        // mark attendance
        // class attended result emitto same user
    })
}

async function attendedClass(uid, subjectCode) {
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
}

module.exports = s_handle

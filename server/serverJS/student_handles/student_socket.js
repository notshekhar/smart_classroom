const { attendance, upcomming_attendance, users } = require("../db")
const { auth } = require("../auth")

function s_handle(s, uid, branch_id) {
    s.on("class_attend", async ({ token, subjectCode, present }) => {
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
                let att = await attendedClass(
                    uid,
                    branch_id,
                    subjectCode,
                    present
                )
                if (att.attended) {
                    s.emit("class_attend_response", att)
                    s.to(branch_id).broadcast.emit("new_attendance", att)
                }
            }
        } catch (err) {
            s.emit("class_attend_response", {
                attended: false,
                message: err.message,
            })
        }
    })
    //upcommign class attending
    s.on("class_attending", async ({ token, subjectCode, present }) => {
        // console.log(uid, token, subjectCode)
        //auth the user
        try {
            let a = await auth(token)
            if (!a.auth) {
                s.emit("class_attending_response", {
                    attended: false,
                    message: "You are not autharized re-login ",
                })
            } else {
                let att = await attendClassUpcomming(
                    uid,
                    branch_id,
                    subjectCode,
                    present
                )
                if (att.attended) {
                    s.emit("class_attending_response", att)
                    s.to(branch_id).broadcast.emit(
                        "new_attendance_attending",
                        att
                    )
                }
            }
        } catch (err) {
            s.emit("class_attending_response", {
                attended: false,
                message: err.message,
            })
        }
    })
}

async function attendedClass(uid, branch_id, subjectCode, present) {
    let attended = await attendance.findOne({
        uid,
        subjectCode,
        date: new Date().toDateString(),
    })
    let user = await users.findOne({ uid })
    if (!attended) {
        let att = await attendance.insert({
            subjectCode,
            uid,
            branch_id,
            present,
            date: new Date().toDateString(),
        })
        return {
            attended: true,
            present,
            subjectCode,
            user: {
                uid,
                photo_url: false,
                name: user.name,
            },
        }
    }
    return {
        attended: true,
        present: attended.present,
        subjectCode,
        user: {
            uid,
            photo_url: false,
            name: user.name,
        },
    }
}

async function attendClassUpcomming(uid, branch_id, subjectCode, present) {
    let attended = await upcomming_attendance.findOne({
        uid,
        subjectCode,
        date: new Date().toDateString(),
    })
    let user = await users.findOne({ uid })
    if (!attended) {
        let att = await upcomming_attendance.insert({
            subjectCode,
            uid,
            branch_id,
            present,
            date: new Date().toDateString(),
        })
        return {
            attended: true,
            present,
            subjectCode,
            user: {
                uid,
                photo_url: false,
                name: user.name,
            },
        }
    }
    return {
        attended: true,
        present: attended.present,
        subjectCode,
        user: {
            uid,
            photo_url: false,
            name: user.name,
        },
    }
}

module.exports = s_handle

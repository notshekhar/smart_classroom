const {
    attendance,
    upcomming_attendance,
    users,
    users_profile,
} = require("../db")
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
    let user_profile = await users_profile.findOne({ uid })
    user_profile = user_profile || { photo_url: false }
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
                photo_url: user_profile.photo_url || false,
                name: user.name,
                color: generateRandomColor(),
            },
        }
    }
    return {
        attended: true,
        present: attended.present,
        subjectCode,
        user: {
            uid,
            photo_url: user_profile.photo_url || false,
            name: user.name,
            color: generateRandomColor(),
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
    let user_profile = await users_profile.findOne({ uid })
    user_profile = user_profile || { photo_url: false }

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
                photo_url: user_profile.photo_url || false,
                name: user.name,
                color: generateRandomColor(),
            },
        }
    }
    return {
        attended: true,
        present: attended.present,
        subjectCode,
        user: {
            uid,
            photo_url: user_profile.photo_url || false,
            name: user.name,
            color: generateRandomColor(),
        },
    }
}

function generateRandomColor() {
    let str = "0123456789ABCDEF"
    return "#xxxxxx".replace(
        /x/g,
        () => str[Math.floor(Math.random() * str.length)]
    )
}

module.exports = s_handle

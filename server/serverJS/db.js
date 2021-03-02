const monk = require("monk")
// const URI =
//     process.env.DEPLOY != "dev" ? process.env.MONGO_URI : "localhost/smartclass"
const URI = "localhost/smartclass"
const db = monk(URI)
const users = db.get("users")
const schools = db.get("schools")
const branches = db.get("branches")
const timetable = db.get("timetable")
const classes = db.get("classes")
const branch_classes = db.get("branch_classes")
const attendance = db.get("attendance")

// async function init() {
//     // let i = await attendance.insert({ date: new Date().toDateString() })
//     let f = await attendance.insert({
//         subjectCode: "IT302",
//         uid: "shekhar",
//         date: new Date().toDateString(),
//     })
//     console.log(f)
// }
// init()

module.exports = {
    users,
    schools,
    classes,
    branches,
    timetable,
    branch_classes,
    attendance,
}

const monk = require("monk")
// const URI =
//     process.env.DEPLOY != "dev" ? process.env.MONGO_URI : "localhost/smartclass"
const URI = "localhost/smartclass"
const db = monk(URI)
const users = db.get("users")
const schools = db.get("schools")
const branches = db.get("branches")
const timetable = db.get("timetable")
const branch_classes = db.get("branch_classes")

module.exports = {
    users,
    schools,
    branches,
    timetable,
    branch_classes,
}

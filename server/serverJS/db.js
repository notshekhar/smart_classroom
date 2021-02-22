const monk = require("monk")
// const URI =
//     process.env.DEPLOY != "dev" ? process.env.MONGO_URI : "localhost/smartclass"
const URI = "localhost/smartclass"
const db = monk(URI)
const users = db.get("users")
const schools = db.get("schools")
const branches = db.get("branches")

module.exports = {
    users,
    schools,
    branches,
}

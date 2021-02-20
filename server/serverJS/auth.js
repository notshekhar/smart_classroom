const { users } = require("./db")
const { decodeJSON } = require("./encryption")

async function auth(token) {
    let { uid, mobile, created_date } = decodeJSON(token)
    let user = await users.findOne({ uid, mobile })
    if (!user) throw new Error("No user exist")
    return {
        auth: true,
        detail_page: !(user.branch_id & user.school_id & user.roll_number),
    }
}

module.exports = {
    auth,
}

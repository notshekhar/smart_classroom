const { auth_firebase } = require("../firebase_auth")

module.exports = async function loginHandle(req, res, next) {
    try {
        let { token } = req.query
        let data = await auth_firebase(token)
        res.json(data)
    } catch (err) {
        next(err)
    }
}

const { auth } = require("../auth")

module.exports = async function authHandle(req, res, next) {
    try {
        let { token } = req.query
        let data = await auth(token)
        res.json(data)
    } catch (err) {
        next(err)
    }
}

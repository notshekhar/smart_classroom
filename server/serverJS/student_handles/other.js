const { schools, users, branches, timetable, branch_classes } = require("../db")

//auth
const { auth } = require("../auth")

async function AuthMiddlewareQuery(req, res, next) {
    try {
        let { token } = req.query
        let a = await auth(token)
        if (!a.auth) throw new Error("User not autharised")
        next()
    } catch (err) {
        next(err)
    }
}
async function AuthMiddlewareBody(req, res, next) {
    try {
        let { token } = req.body
        let a = await auth(token)
        if (!a.auth) throw new Error("User not autharised")
        next()
    } catch (err) {
        next(err)
    }
}
async function getAllSchools(req, res, next) {
    try {
        let r = await schools.find({})
        res.status(200).json(r)
    } catch (err) {
        next(err)
    }
}
async function getBranches(req, res, next) {
    try {
        let { school_id } = req.query
        let b = await branches.find({ school_id })
        res.status(200).json(b)
    } catch (err) {
        next(err)
    }
}

async function infoHandle(req, res, next) {
    try {
        let { id } = req.query
        let {
            uid,
            name,
            school_id,
            branch_id,
            roll_number,
        } = await users.findOne({ uid: id })
        res.status(200).json({
            uid,
            name,
            school_id,
            branch_id,
            roll_number,
        })
    } catch (err) {
        next(err)
    }
}

async function updateDetailsHandle(req, res, next) {
    try {
        let { data, uid, photo_url } = req.body
        console.log(data)
        let update = await users.findOneAndUpdate({ uid }, { $set: data })
        if (!update) throw new Error("Somethig went wrong")
        res.json({ updated: true })
    } catch (err) {
        next(err)
    }
}

async function getTimeTable(req, res, next) {
    try {
        let { uid } = req.query
        let user = await users.findOne({ uid })
        let branch_c = await branch_classes.findOne({
            branch_id: user.branch_id,
        })
        let tt = await timetable.findOne({
            branch_id: user.branch_id,
        })
        res.status(200).json({
            timetable: tt.timetable,
            branch_classes: branch_c.classes,
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    AuthMiddlewareQuery,
    AuthMiddlewareBody,
    getAllSchools,
    getBranches,
    infoHandle,
    updateDetailsHandle,
    getTimeTable,
}

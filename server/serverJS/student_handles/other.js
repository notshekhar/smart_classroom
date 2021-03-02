const {
    schools,
    users,
    branches,
    timetable,
    branch_classes,
    classes,
    attendance,
} = require("../db")

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
        let subjectCodes = branch_c.classes.map((e) => e.subjectCode)
        let s = await classes.find({
            subjectCode: { $in: subjectCodes },
        })
        let attending_people = await attendance.find({
            $and: [
                {
                    subjectCode: { $in: subjectCodes },
                },
                { present: true },
                { date: new Date().toDateString() },
            ],
        })
        let attending_people_uids = attending_people.map((e) => {
            return e.uid
        })
        let attending_people_names = await users.find({
            uid: { $in: attending_people_uids },
        })
        let attended_classes = await attendance.find({
            $and: [
                {
                    subjectCode: { $in: subjectCodes },
                },
                { date: new Date().toDateString() },
                { uid: uid },
            ],
        })
        // console.log(attending_people)
        let subjects = {}
        s.forEach((e) => {
            let sd = branch_c.classes.filter(
                (c) => c.subjectCode == e.subjectCode
            )[0]
            subjects[sd.subjectCode] = {
                name: e.name,
                teacherName: sd.teacherName,
                people: false,
            }
        })
        //classes attended by the user
        attended_classes.forEach((a) => {
            subjects[a.subjectCode].attended = true
        })
        //class attended by other users
        attending_people.forEach((a) => {
            //TODO: also add details like user_profile and name
            let user_name = attending_people_names.filter(
                (e) => e.uid == a.uid
            )[0].name

            if (!(subjects[a.subjectCode] && subjects[a.subjectCode].people))
                subjects[a.subjectCode].people = []

            subjects[a.subjectCode].people.push({
                uid: a.uid,
                name: user_name,
                photo_url: false,
            })
        })
        res.status(200).json({
            timetable: tt.timetable,
            subjects,
        })
    } catch (err) {
        next(err)
    }
}
async function getBranchId(req, res, next) {
    try {
        let { uid } = req.query
        let user = await users.findOne({ uid }, "branch_id")
        res.status(200).json(user)
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
    getBranchId,
}

const { Router } = require("express")

const loginHandle = require("../student_handles/login")
const authHandle = require("../student_handles/auth")
const {
    getAllSchools,
    getBranches,
    infoHandle,
    AuthMiddlewareQuery,
    AuthMiddlewareBody,
    updateDetailsHandle,
    getTimeTable,
    getBranchId,
    getUserProfile,
} = require("../student_handles/other")

const router = Router()

router.get("/", (req, res) => {
    res.send(req.headers)
})
router.get("/login", loginHandle)
router.get("/auth", authHandle)
router.get("/allSchools", getAllSchools)
router.get("/getBranches", getBranches)
router.get("/getinfo", AuthMiddlewareQuery, infoHandle)
router.get("/getTimetable", AuthMiddlewareQuery, getTimeTable)
router.get("/getBranchId", getBranchId)
router.get("/getUserProfile/:uid", getUserProfile)
//post req
router.post("/updateDetails", AuthMiddlewareBody, updateDetailsHandle)

module.exports = router

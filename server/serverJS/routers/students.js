const { Router } = require("express")

const loginHandle = require("../student_handles/login")
const authHandle = require("../student_handles/auth")
const {
    getAllSchools,
    getBranches,
    infoHandle,
    AuthMiddlewareQuery,
} = require("../student_handles/other")

const router = Router()

router.get("/login", loginHandle)
router.get("/auth", authHandle)
router.get("/allSchools", getAllSchools)
router.get("/getBranches", getBranches)
router.get("/getinfo", AuthMiddlewareQuery, infoHandle)

module.exports = router

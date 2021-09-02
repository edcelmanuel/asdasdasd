const express = require("express")
const { authToken } = require("../controller/authentication")
const router = express.Router()
const memberCtrl = require("../controller/members")

router
    .route("/")
    .get(authToken, memberCtrl.getAllMember) // Get Users Table
    .post(memberCtrl.insertMember) // Insert User

router.route("/search").post(authToken, memberCtrl.searchMember)

router
    .route("/:uid")
    .get(authToken, memberCtrl.findMemberByID) // Get Single User
    .patch(authToken, memberCtrl.updateMember) // Update User

// Get Users Table

module.exports = router

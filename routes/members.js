const express = require("express")
const { authToken } = require("../controller/authentication")
const router = express.Router()
const memberCtrl = require("../controller/members")

router
    .route("/")
    .get(authToken, memberCtrl.getAllMember) // Get Member Table
    .post(memberCtrl.insertMember) // Insert Member

router.route("/search/:page").post(authToken, memberCtrl.searchMember)

router.route("/page/:page").get(authToken, memberCtrl.getMemberByPage)

router
    .route("/:uid")
    .get(authToken, memberCtrl.findMemberByID) // Get Single Member
    .patch(authToken, memberCtrl.updateMember) // Update Member
    .delete(authToken, memberCtrl.deleteMemberByID) // Delete Member

// Get Users Table

module.exports = router

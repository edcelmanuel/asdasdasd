const express = require("express")
const { authToken } = require("../controller/authentication")
const router = express.Router()
const usersCtrl = require("../controller/users")

router
    .route("/")
    .get(authToken, usersCtrl.getAllUsers) // Get Users Table
    .post(usersCtrl.insertUser) // Insert User

router
    .route("/:uid")
    .get(authToken, usersCtrl.findUserByID) // Get Single User
    .patch(authToken, usersCtrl.updateUser) // Update User

module.exports = router

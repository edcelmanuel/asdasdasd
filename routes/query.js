const express = require("express")
const { authToken } = require("../controller/authentication")
const router = express.Router()
const pool = require("../controller/mydb")

const postQuery = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err)
        console.log(`connected as id ${connection.threadId}`)

        const queries = req.body.query

        console.log(queries)

        connection.query(`${queries}`, (err, rows) => {
            connection.release()

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }
            res.json(rows)
        })
    })
}

router.post("/", postQuery)

//TODO: Back the authToken

module.exports = router

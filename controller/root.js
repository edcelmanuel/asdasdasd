const pool = require("./mydb")
const auth = require("./authentication")
const { isEmptyObject } = require("./functions")

const login = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) console.log(err)
        console.log(process.env.DB_HOST)
        console.log(`connected as id ${connection.threadId}`)

        const { user, pass } = req.body

        console.log(user, pass)

        if (typeof user === "undefined") return res.json({ status: "failed" })
        if (typeof pass === "undefined") return res.json({ status: "failed" })

        connection.query(
            "Select * from users WHERE UCASE(user) = ? and pass = ?",
            [user.toUpperCase(), pass],
            (err, rows) => {
                connection.release()
                if (!err) {
                    //
                    // res.send(token);
                    if (isEmptyObject(rows)) return res.json({ status: "failed" })

                    const token = auth.genToken({ user: req.body.user })
                    res.json({ status: "success", token: token, data: rows ? rows[0] : {} })
                } else {
                    res.sendStatus(400)
                    console.log(err)
                }
            }
        )
    })
}

const authCheck = (req, res) => {
    var response = auth.checkToken(req.body.token)
    res.json(response)
}

module.exports = { login, authCheck }

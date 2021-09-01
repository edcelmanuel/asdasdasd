const pool = require("./mydb")
const { isEmptyObject } = require("./functions")

const getAllMember = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err)
        console.log(`connected as id ${connection.threadId}`)

        connection.query("SELECT * FROM members ", (err, rows) => {
            connection.release()

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }
            res.json(rows)
        })
    })
}

const insertMember = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err)
        console.log(`connected as id ${connection.threadId}`)

        const params = {
            email: req.body.email.trim(),
            name: `${req.body.name_last.trim()}, ${req.body.name_first.trim()} ${req.body.name_middle}`,
            name_last: req.body.name_last.trim(),
            name_first: req.body.name_first.trim(),
            name_middle: req.body.name_middle.trim(),
            res: req.body.res.trim(),
            mun: req.body.mun.trim(),
            brgy: req.body.brgy.trim(),
            prec: req.body.prec.trim(),
            contact: req.body.contact.trim(),
            picture: ``,
        }

        connection.query("INSERT INTO members SET ?", params, (err, rows) => {
            connection.release()

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }
            res.json({
                status: "success",
                message: `Successfully added to Members`,
            })
        })

        console.log(req.body)
    })
}

const findMemberByID = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err)
        console.log(`connected as id ${connection.threadId}`)

        connection.query("SELECT * FROM users WHERE uid = ?", [req.params.uid], (err, rows) => {
            connection.release()

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }

            // rows = rows.map(row => (row.access = JSON.parse(row.access), row));
            res.json(rows)
        })
    })
}

const updateMember = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err)
        console.log(`connected as id ${connection.threadId}`)

        const params = {
            res: req.body.res,
            pass: req.body.pass,
            pending: req.body.pending,
            role: req.body.role,
            access: JSON.stringify(req.body.access),
            added_by: req.body.added_by,
        }

        connection.query("UPDATE users SET ? WHERE uid = ?", [params, req.params.uid], (err, rows) => {
            connection.release()

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }
            res.json({
                status: "Success",
                message: `Username ${req.body.user} has been UPDATED.`,
            })
        })
    })
}

module.exports = { findMemberByID, getAllMember, insertMember, updateMember }

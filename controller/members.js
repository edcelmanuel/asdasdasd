const pool = require("./mydb")
const { base64_encode } = require("./functions")
const pdf2base64 = require("pdf-to-base64")
const fs = require("fs")
const { parseISO, format } = require("date-fns")

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

const getMemberByPage = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err)
        console.log(`connected as id ${connection.threadId}`)

        const page = (req.params.page - 1) * 10
        connection.query("SELECT * FROM members LIMIT ? ,10; ", [page], (err, rows1) => {
            connection.release()
            let count
            connection.query("SELECT count(*) as count FROM members", [page], (err, rows2) => {
                connection.release()
                count = rows2[0].count

                if (err) {
                    res.sendStatus(400)
                    return console.log(err)
                }

                let newRows = []
                rows1.forEach(function (arrayItem) {
                    let imageAsBase64
                    try {
                        imageAsBase64 = fs.readFileSync(
                            `public/public/membersPicture/` + `${arrayItem.uid}` + `.jpg`,
                            "base64"
                        )
                        arrayItem.picture = imageAsBase64
                        newRows.push(arrayItem)
                    } catch (err) {
                        arrayItem.picture = ""
                        newRows.push(arrayItem)
                    }
                })

                res.json({ rows: newRows, count: count })
            })
        })
    })
}

const insertMember = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err)
        console.log(`connected as id ${connection.threadId}`)

        bday = format(parseISO(req.body.bday), "yyyy-MM-dd")

        const params = {
            email: req.body.email.trim(),
            name: `${req.body.name_last.trim()}, ${req.body.name_first.trim()} ${req.body.name_middle}`,
            name_last: req.body.name_last.trim(),
            name_first: req.body.name_first.trim(),
            name_middle: req.body.name_middle.trim(),
            bday: bday,
            res: req.body.res.trim(),
            mun: req.body.mun.trim(),
            brgy: req.body.brgy.trim(),
            prec: req.body.prec.trim(),
            contact: req.body.contact.trim(),
            picture: ``,
        }

        const base64Picture = req.body.picture

        connection.query(
            "select uid from members where name_last = ? and name_first = ? and name_middle = ?",
            [params.name_last, params.name_first, params.name_middle],
            (err, rows1) => {
                connection.release()

                if (err) {
                    res.sendStatus(400)
                    return console.log(err)
                }

                if (rows1 === undefined || rows1.length == 0) {
                    connection.query("INSERT INTO members SET ?", params, (err, rows2) => {
                        connection.release()

                        if (err) {
                            res.sendStatus(400)
                            return console.log(err)
                        }

                        connection.query(
                            "select uid from members where name_last = ? and name_first = ? and name_middle = ?",
                            [params.name_last, params.name_first, params.name_middle],
                            (err, rows3) => {
                                connection.release()

                                const filepath = `public/public/membersPicture/${rows3[0].uid.toString()}.jpg`

                                if (err) {
                                    res.sendStatus(400)
                                    return console.log(err)
                                }

                                var base64Data = base64Picture
                                    ? base64Picture.replace(/^data:image\/jpeg;base64,/, "")
                                    : null

                                base64Data &&
                                    require("fs").writeFile(filepath, base64Data, "base64", function (err) {
                                        console.log(err)
                                    })

                                res.json({
                                    status: "success",
                                    message: `Successfully added to Members`,
                                })
                            }
                        )
                    })
                } else {
                    res.json({
                        status: "failed",
                        message: `Name Already Registered`,
                    })
                }
            }
        )
    })
}

const findMemberByID = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err)
        console.log(`connected as id ${connection.threadId}`)

        connection.query("SELECT * FROM members WHERE uid = ?", [req.params.uid], (err, rows) => {
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

const deleteMemberByID = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err)
        console.log(`connected as id ${connection.threadId}`)

        connection.query("DELETE FROM members WHERE uid = ?", [req.params.uid], (err, rows) => {
            connection.release()

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }

            console.log(`Member ${req.params.uid}`)

            res.json({
                status: "success",
                message: `Successfully Deleted`,
            })
        })
    })
}

const updateMember = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err)
        console.log(`MemberUpdated connected as id ${connection.threadId}`)

        const memberData = req.body.data
        bday = format(parseISO(req.body.bday), "yyyy-MM-dd")
        const params = {
            email: memberData.email.trim(),
            name: `${memberData.name_last.trim()}, ${memberData.name_first.trim()} ${memberData.name_middle}`,
            name_last: memberData.name_last.trim(),
            name_first: memberData.name_first.trim(),
            name_middle: memberData.name_middle.trim(),
            bday: bday,
            res: memberData.res.trim(),
            mun: memberData.mun.trim(),
            brgy: memberData.brgy.trim(),
            prec: memberData.prec.trim(),
            contact: memberData.contact.trim(),
            picture: ``,
        }

        const base64Picture = req.body.picture

        connection.query("UPDATE members SET ? WHERE uid = ?", [params, memberData.uid], (err, rows) => {
            connection.release()

            var base64Data = base64Picture ? base64Picture.replace(/^data:image\/jpeg;base64,/, "") : null
            const filepath = `public/public/membersPicture/${memberData.uid}.jpg`

            base64Data &&
                require("fs").writeFile(filepath, base64Data, "base64", function (err) {
                    console.log(err)
                })

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }
            res.json({
                status: "Success",
                message: `Username ${req.body.user} has been UPDATED.`,
                data: base64Data,
            })
        })
    })
}

const searchMember = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw console.log(err)
        console.log(`connected as id ${connection.threadId}`)

        const search = `%${req.body.search}%`
        const page = (req.params.page - 1) * 10

        connection.query(
            "SELECT * FROM members WHERE uid like ? OR name_first like ? OR name_middle like ? OR name_last like ? OR res like ? OR mun like ? OR brgy like ? OR prec like ? OR email like ? LIMIT ? ,10;",
            [search, search, search, search, search, search, search, search, search, page],
            (err, rows1) => {
                connection.release()

                let count

                connection.query(
                    "SELECT count(*) as count FROM members WHERE uid like ? OR name_first like ? OR name_middle like ? OR name_last like ? OR res like ? OR mun like ? OR brgy like ? OR prec like ? OR email like ?",
                    [search, search, search, search, search, search, search, search, search, page],
                    (err, rows2) => {
                        connection.release()

                        count = rows2[0].count

                        if (err) {
                            res.sendStatus(400)
                            return console.log(err)
                        }

                        let newRows = []
                        rows1.forEach(function (arrayItem) {
                            let imageAsBase64
                            try {
                                imageAsBase64 = fs.readFileSync(
                                    `public/public/membersPicture/` + `${arrayItem.uid}` + `.jpg`,
                                    "base64"
                                )
                                arrayItem.picture = imageAsBase64
                                newRows.push(arrayItem)
                            } catch (err) {
                                arrayItem.picture = ""
                                newRows.push(arrayItem)
                            }
                        })

                        // console.log(newRows)

                        res.json({ rows: newRows, count: count })
                    }
                )
            }
        )
    })
}

module.exports = {
    findMemberByID,
    getAllMember,
    insertMember,
    updateMember,
    searchMember,
    getMemberByPage,
    deleteMemberByID,
}

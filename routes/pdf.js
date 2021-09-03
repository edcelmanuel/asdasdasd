const express = require("express")
const { authToken } = require("../controller/authentication")
const pool = require("../controller/mydb")
const router = express.Router()
const pdf2base64 = require("pdf-to-base64")

var fonts = {
    Roboto: {
        normal: "fonts/Roboto-Regular.ttf",
        bold: "fonts/Roboto-Medium.ttf",
        italics: "fonts/Roboto-Italic.ttf",
        bolditalics: "fonts/Roboto-MediumItalic.ttf",
    },
}

var PdfPrinter = require("pdfmake")
var printer = new PdfPrinter(fonts)
var fs = require("fs")

function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ")
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    // Directly return the joined string
    return splitStr.join(" ")
}

const getPDF = (req, res) => {
    let x = []
    for (let i = 0; i < 250; i += 20) {
        x.push({ text: i + ",", absolutePosition: { x: i, y: 40 } })
        x.push({ text: i + ",", absolutePosition: { x: 240, y: i } })
    }
    var docDefinition = {
        pageSize: {
            width: 595.28,
            height: 300.28,
        },
        content: x,
    }

    var pdfDoc = printer.createPdfKitDocument(docDefinition)
    pdfDoc.pipe(fs.createWriteStream(`public/public/template.pdf`))
    pdfDoc.end()
    res.json({
        status: "success",
        message: `ID Created`,
        pdf: `public/public/template.pdf`,
    })
}

const getIDMemberPDF = async (req, res) => {
    pool.getConnection(async (err, connection) => {
        if (err) throw console.log(err)
        console.log(`connected as id ${connection.threadId}`)

        const uid = req.body.uid

        connection.query("SELECT * FROM members WHERE uid = ?", [uid], async (err, rows) => {
            connection.release()

            if (err) {
                res.sendStatus(400)
                return console.log(err)
            }

            const filepath = `public/public/membersId/${uid.toString()}.pdf`

            fs.stat(filepath, async (err, stat) => {
                if (err == null) {
                    pdf2base64(`public/public/membersId/` + `${uid}` + `.pdf`)
                        .then((response) => {
                            res.json({
                                status: "success",
                                message: `ID USed`,
                                pdf: response,
                            })
                            // res.send(response)
                        })
                        .catch((error) => {
                            console.log(error) //Exepection error....
                        })
                } else if (err.code === "ENOENT") {
                    // file does not exist
                    const data = rows[0]

                    var docDefinition = {
                        pageMargins: [0, 0, 0, 0],
                        pageSize: {
                            width: 595.28,
                            height: 300.28,
                        },
                        content: [
                            {
                                // under NodeJS (or in case you use virtual file system provided by pdfmake)
                                // you can also pass file names here
                                image: "assets/id.jpg",
                                absolutePosition: { x: 0, y: 0 },
                                width: 595.28,
                                height: 300.28,
                            },
                            {
                                // under NodeJS (or in case you use virtual file system provided by pdfmake)
                                // you can also pass file names here
                                image: `public/public/membersPicture/${data.uid.toString()}.jpg`,
                                absolutePosition: { x: 16, y: 99 },
                                width: 175.28,
                                height: 142.28,
                            },
                            {
                                text: titleCase(data.name.replace(/(\r\n|\n|\r)/gm, " ")),
                                absolutePosition: { x: 210, y: 115 },
                            },
                            {
                                text: titleCase(data.res.replace(/(\r\n|\n|\r)/gm, " ")),
                                absolutePosition: { x: 210, y: 150 },
                            },
                            {
                                text: titleCase(data.brgy.replace(/(\r\n|\n|\r)/gm, " ")),
                                absolutePosition: { x: 210, y: 185 },
                            },
                            {
                                text: titleCase(data.mun.replace(/(\r\n|\n|\r)/gm, " ")),
                                absolutePosition: { x: 400, y: 185 },
                            },
                            {
                                text: titleCase(data.uid.toString()).padStart(8, "0"),
                                absolutePosition: { x: 330, y: 270 },
                            },
                            {
                                text: titleCase(data.prec.replace(/(\r\n|\n|\r)/gm, " ")),
                                absolutePosition: { x: 400, y: 270 },
                            },
                        ],
                    }

                    var pdfDoc = printer.createPdfKitDocument(docDefinition)
                    // pdfDoc.pipe(fs.createWriteStream(filepath))
                    // await pdfDoc.end()

                    savePdfToFile(pdfDoc, filepath).then(() => {
                        pdf2base64(`public/public/membersId/` + `${uid}` + `.pdf`)
                            .then((response) => {
                                console.log(__dirname) //cGF0aC90by9maWxlLmpwZw==
                                res.json({
                                    status: "success",
                                    message: `ID Created`,
                                    pdf: response,
                                })
                            })
                            .catch((error) => {
                                console.log(error) //Exepection error....
                            })
                    })
                } else {
                    console.log("Some other error: ", err.code)
                }
            })
        })
    })
}

function savePdfToFile(pdf, fileName) {
    return new Promise((resolve, reject) => {
        let pendingStepCount = 2

        const stepFinished = () => {
            if (--pendingStepCount == 0) {
                resolve()
            }
        }

        const writeStream = fs.createWriteStream(fileName)
        writeStream.on("close", stepFinished)
        pdf.pipe(writeStream)

        pdf.end()

        stepFinished()
    })
}

router.get("/member/:uid", getIDMemberPDF)
router.get("/template", getPDF)

module.exports = router

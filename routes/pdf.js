const express = require("express")
const { authToken } = require("../controller/authentication")
const router = express.Router()

const { jsPDF } = require("jspdf")

const getPDF = (req, res) => {
    const doc = new jsPDF()
    doc.text("Hello world!", 10, 10)
    doc.addPage()
    doc.text("Hello world!", 10, 10)
    doc.save("public/pdf/text.pdf")

    res.json({
        status: "success",
        message: `PDF Created`,
    })
}

router.get("/", getPDF)

module.exports = router

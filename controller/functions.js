var fs = require("fs")

function isEmptyObject(obj) {
    return !Object.keys(obj).length
}

module.exports = { isEmptyObject }

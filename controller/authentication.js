const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

var refreshTokens = []

// get config vars
dotenv.config();

const genToken = (username) => {
    return jwt.sign(username, process.env.SECRET_TOKEN, { expiresIn: '7h' });
}

const checkToken = (token) => {
    var response = jwt.verify(token, process.env.SECRET_TOKEN , (err) => {
        if (err) return {isValid: false}
        return {isValid: true}
    })
    return response
}


const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SECRET_TOKEN , (err, user) => {
        
        if (err) {
            console.log("Forbidden Access")
            return res.sendStatus(403)
        }
        
        req.user = user
    
        next()
    })
}


module.exports = {genToken, authToken, checkToken};
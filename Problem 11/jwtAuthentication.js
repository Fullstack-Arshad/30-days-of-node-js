const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const secretKey = require('./secretKey')

function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if(!authHeader)
    return res.status(401).json({ message: "Unauthorized: Missing authorization header" })

    const token = authHeader.split(" ")[1]
    if(!token)
    return res.status(401).json({ message: "Unauthorized: Invalid JWT token" })
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized: Invalid JWT token" });
        }    
        req.user = decoded;
        next();
      });
}
app.use(authenticationMiddleware)

app.get('/',(req,res) => {
    res.send("User Authenticated")
})

app.listen(3000, () => console.log("Server running at port 3000"))
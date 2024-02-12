const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const port = 4200
const secretKey = require('./secretKey')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.send("get token from here")
})

app.post('/token',(req,res) => {
    const name = req.body.name
    const email = req.body.email
    const payload = {
        "name": name,
        "email": email
    }
    const token = jwt.sign(payload, secretKey)
    res.send(token)
})
app.listen(port,() => {
    console.log("Server running at",port)
})
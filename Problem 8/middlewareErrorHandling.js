const express = require('express')
const app = express()
const port = 3000
 
function positiveIntegerHandler(err, req, res, next) {
  console.error(err.message)
  res.status(400).send('Bad Request')
}
 
app.use(positiveIntegerHandler)
app.get('/', (req, res) => {
    res.type('html').send(`
    <script>
        window.onload = function() {
            let number = prompt("Enter a number: ")
            window.location.href = '/positive?number=' + number
        };
    </script>`)
})
 
app.get('/positive',(req,res,next)=>{
    const number = isNaN(Number(req.query.number)) ? -1 : Number(req.query.number)
    if(number > 0)
        res.send("Success")
    else
        next(new Error("Invalid number entered. Please enter a positive integer."))
})
 
app.listen(port, () => console.log(`Server is listening on port ${port}`))
 

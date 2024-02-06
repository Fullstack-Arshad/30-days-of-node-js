const express = require('express');
const app = express();

function greetHandler(req, res) {
    const name = req.query.name || "Guest"; 
  
    const greeting = `Hello, ${name}!`; 
  
    res.send(greeting); 
}

app.get('/greet', greetHandler); 

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
  
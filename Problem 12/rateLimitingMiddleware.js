const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

let requestCounter = {};
const limit = 10; 
const resetTime = 10 * 60 * 1000; 

function rateLimitMiddleware(req, res, next) {
  const ip = req.ip;
  const currentTime = new Date().getTime();

  if (!requestCounter[ip]) {
    requestCounter[ip] = { count: 1, startTime: currentTime };
  } else {
    if (currentTime - requestCounter[ip].startTime < resetTime) {
      if (requestCounter[ip].count >= limit) {
        res.status(429).send("Too Many Requests");
        return;
      } else {
        requestCounter[ip].count++;
      }
    } else {
      requestCounter[ip] = { count: 1, startTime: currentTime };
    }
  }
  next();
}

app.use(rateLimitMiddleware);

app.get("/", (req, res) => {
  res.send("Success");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

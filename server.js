require('dotenv').config();
const express = require('express')
const http = require('http')
const jwt = require('jsonwebtoken')

const app = express()
const router = express.Router();
const port = process.env.PORT || 3001


app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/4537/termproject/API/V1/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html')
})

app.get('/4537/termproject/API/V1/register', (req,res) => {
  res.sendFile(__dirname + '/views/register.html')
})

app.get('/4537/termproject/API/V1/documentation', (req,res) => {
  res.sendFile(__dirname + '/views/documentation.html')
})

// not tested yet
app.get("/API/V1/loadtweets", (req, res) => {
  dbCon.query("SELECT t.content, u.username FROM TWEET t "
    + "INNER JOIN USER u ON t.userID = u.userID;",
    function(err, results, fields) {
    if (err) {
      console.log("DB error: " + err);
    } else {
      return res.json(results);
    }
  });
});

function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) =>{
    if(err) return res.sendStatus(403)
    req.user = user
    console.log(user.username)
    next()
  })
}

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

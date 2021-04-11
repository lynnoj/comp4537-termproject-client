require('dotenv').config();
const express = require('express')
const http = require('http')
const jwt = require('jsonwebtoken')

const app = express()
const router = express.Router();
const port = process.env.PORT || 3001
let username;

app.use(express.static('public'))
app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));
app.use("/images", express.static("public/images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', authenticateToken, (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/4537/termproject/API/V1/getUserName', authenticateToken, (req, res) => {
  res.end(username)
});

app.get('/4537/termproject/API/V1/admin', (req,res) => {
  res.sendFile(__dirname + '/views/admin.html')
});

app.get('/4537/termproject/API/V1/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html')
});

app.get('/4537/termproject/API/V1/register', (req,res) => {
  res.sendFile(__dirname + '/views/register.html')
});

app.get('/4537/termproject/API/V1/main', (req,res) => {
  res.sendFile(__dirname + '/views/main.html')
});

app.get('/4537/termproject/API/V1/quack', (req,res) => {
  res.sendFile(__dirname + '/views/quack.html')
});

app.get('/4537/termproject/API/V1/documentation', (req,res) => {
  res.sendFile(__dirname + '/views/documentation.html')
});

function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(user.username);
    username = user.username
    next();
  });
}

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});

const express = require('express')
const http = require('http')

const app = express()
const router = express.Router();
const port = process.env.PORT || 3001


app.use(express.static('public'))
app.use("/css", express.static("public/css"));
app.use("/js", express.static("public/js"));
app.use("/images", express.static("public/images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/4537/termproject/API/V1/admin', (req,res) => {
  res.sendFile(__dirname + '/views/admin.html')
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

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

const express = require('express')
const http = require('http')
const mysql = require('mysql')
const app = express()
const router = express.Router();
const port = process.env.PORT || 3000
const dbCon = mysql.createPool({
    connectionLimit: 10,
    host: "",
    user: "",
    password: "",
    database: ""
});


app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/css', express.static(__dirname + 'public/js'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

// not tested yet
app.get("/api/loadtweets", (req, res) => {
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


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

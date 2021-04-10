const express = require('express')
const http = require('http')

const app = express()
const router = express.Router();
const port = process.env.PORT || 3001


app.use(express.static('/public'))
app.use("/css", express.static(__dirname + "public/css"));
app.use("/css", express.static(__dirname + "public/js"));
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

app.get('/4537/termproject/API/V1/documentation', (req,res) => {
  res.sendFile(__dirname + '/views/documentation.html')
});

// not tested yet
// app.get("/API/V1/loadquacks", (req, res) => {
//   dbCon.query("SELECT t.content, u.username FROM TWEET t "
//     + "INNER JOIN USER u ON t.userID = u.userID;",
//     function(err, results, fields) {
//     if (err) {
//       console.log("DB error: " + err);
//     } else {
//       return res.json(results);
//     }
//   });
// });

app.post("/API/V1/create-quack", (req, res) =>
{
  
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

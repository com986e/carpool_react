const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors')
const mysql = require('mysql');


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '862459',
    port: '3306',
    database: 'csp'
});
connection.connect();


// 로그인 데이터베이스-테이블 관련된 파트
app.get('/api/login',(req,res)=>{
    connection.query('SELECT * FROM addlogin', function(err,rows,fields){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})

app.get('/api/login/email',(req,res)=>{
    connection.query('SELECT email FROM addlogin', function(err,rows,fields){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})

app.get('/api/login/id',(req,res)=>{
    connection.query('SELECT userId FROM addlogin', function(err,rows,fields){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
})
app.post('/api/login',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    let sql = 'INSERT INTO addlogin VALUES (?,?,?,?,?,?,?,?)';
    let userId = req.body.userId
    let password = req.body.password
    let name = req.body.name
    let birthDate = req.body.birthDate
    let email = req.body.email
    let phoneNum = req.body.phoneNum
    let major = req.body.major
    let sex = req.body.sex
    let params = [userId, password, name, birthDate, email, phoneNum, major, sex]
    connection.query(sql, params,
        (err, rows, fields) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.send(rows);
          console.log(err)
          console.log(rows)
    })
})

// 카풀 게시판, 동승자 데이터베이스-테이블 관련된 파트

app.get('/api/board',(req,res)=>{
    connection.query('SELECT * FROM board ORDER BY ind DESC;', function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

app.get('/api/board/user/:writer', (req,res)=>{
    console.log(req.params.writer)
    connection.query('SELECT * FROM board WHERE writer = ? ORDER BY ind DESC;', req.params.writer, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})

// 게시물 추가
app.post('/api/board', (req,res)=>{
    let sql = 'INSERT INTO board VALUES (null,?,?,?,?,?,?,?,now(),?,?,?,?,?,?)';
    let title = req.body.title;
    
    let startProvince = req.body.startProvince;
    let startCity = req.body.startCity;
    let startDetail = req.body.startDetail;

    let arrivalProvince = req.body.arrivalProvince;
    let arrivalCity = req.body.arrivalCity;
    let arrivalDetail = req.body.arrivalDetail;

    let time = req.body.time;

    let driver = req.body.driver;
    let maxPassenger = req.body.maxPassenger;
    let car = req.body.car;
    
    let content = req.body.content;
    let writer = req.body.writer;

    let params = [title,startProvince,startCity,startDetail,arrivalProvince,arrivalCity,arrivalDetail,time,driver,maxPassenger,car,content,writer]
    console.log(req.body)
    connection.query(sql, params, (err,rows,fields)=>{
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rows);
    })
    
})
app.get('/api/passenger/:title', (req,res)=>{
    connection.query('SELECT * FROM passenger WHERE title=?',req.params.title, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })
})
app.post('/api/user/passenger', (req,res)=>{
    console.log(req.body)
    let sql = 'INSERT INTO passenger VALUES (?,?,?,?,?,?)'
    let UserId = req.body.UserId;
    let major = req.body.major;
    let sex = req.body.sex;
    let phoneNum = req.body.phoneNum;
    let comment = req.body.comment;
    let title = req.body.title;
    let params = [UserId, major, sex, phoneNum, comment, title]
    connection.query(sql, params, function(error, rows, field){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows)
    })
    
})

app.delete('/api/board/user/:title', (req, res)=>{
    console.log(req.params.title)
    connection.query('DELETE FROM board WHERE title = ?', req.params.title, function (error, rows, fields) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(rows);
      })

})


app.listen(port, (req,res)=>{
    console.log("서버 작동")
})
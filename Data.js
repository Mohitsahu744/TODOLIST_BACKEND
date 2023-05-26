var mysql = require('mysql')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

var app = express();
app.use(bodyParser.json());
app.use(cors())
var con = mysql.createConnection({
    host : "todolist.clyqga6vzi7o.ap-southeast-1.rds.amazonaws.com",
    user : "admin",
    password : "12345678",
    database : "todolist"
});

con.connect(function(err){
    if(err){
        console.log(err.message)
    }
    else{
        console.log("connection succesfully")
    }
});

app.post('/insert/data', function(req,res){
    var datainsert = {
        name : req.body.name,
        salary : req.body.salary
    }
    let sqlQuery = 'INSERT INTO datainsert  SET ?';
    let query = con.query(sqlQuery, datainsert, function(err,result){
        if(err) throw err;
        res.send(JSON.stringify({"status": 200,"response" : result}));
    });
});

app.get('/display/data', function(req, res){
    let sqlQuery = 'SELECT * FROM datainsert';
    let query = con.query(sqlQuery,function(err,result){
        if(err) throw err;
        res.send(JSON.stringify({"status": 200,"response" : result}));
    });
});
app.delete('/delete/data/:id',function(req,res){
    let sqlQuery = "DELETE FROM datainsert WHERE id=" + req.params.id;
    let query = con.query(sqlQuery,function(err,result){
        if(err) throw err;
        res.send(JSON.stringify({"status": 200,"response" : result}));
    });
});
app.put('/update/data/:id',function(req,res){
    let sqlQuery = "UPDATE datainsert SET name='" + req.body.name + "', salary = '"+ req.body.salary+"'  WHERE id=" + req.params.id;
    let query = con.query(sqlQuery,function(err,result){
        if(err) throw err;
        res.send(JSON.stringify({"status": 200,"response" : result}));
    });
});
app.listen(17000,()=>{
    console.log("server running");
});
const express = require("express");

const app = express();

const bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.post("/", function(req,res){
    var spawn = require("child_process").spawn;

    var process = spawn('python', ['./build_file.py', JSON.stringify(req.body)]);

    res.sendFile(__dirname+"/public/download.html");
});

app.listen(3000, function(){
    console.log("Server is active");
});
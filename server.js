const express = require("express");

const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.post("/", function(req,res){
    
    const websites_dir = __dirname+"/websites";
    
    const count = fs.readdirSync(websites_dir)
    .map(file => path.join(websites_dir, file))
    .filter(path => fs.statSync(path).isDirectory()).length+1;
    
    const file_name = req.body.firstName+"_"+req.body.lastName+".zip";
    
    var spawn = require("child_process").spawn;

    var process = spawn('python', ['./build_file.py', JSON.stringify(req.body)]);

    process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (code == 0){    
            const file = `${__dirname}/websites/website-${count}/${file_name}`;

            res.download(file);
        }

    });

});

app.listen(3000, function(){
    console.log("Server is active");
});
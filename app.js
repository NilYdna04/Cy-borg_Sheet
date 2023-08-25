const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const path = require('path');
const first = require("./firstmodule")
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer()

const app = express();
const port = 8080;
let project = path.join('C:/Users/nilyd/OneDrive/Desktop/coding projects/personal/HTML Projects/Cy-borg sheet');

app.use(express.static("public"))

let db = new sqlite3.Database("./Cy-borg_sheet.db", (err) => {
    if(err) {
        return console.error(err.message)
    }
    console.log("Connected to database")
} )


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array())

app.post('/', function(req,res) {
    console.log(req.body)
    res.send("Form data received")
    db.serialize()
});

app.listen(port, function () {
    console.log(`${first.hello()}`);
});

// db.close((err) => {
//     if(err) {
//         return console.error(err.message)
//     }
//     console.log("Closed Db connection")
// })
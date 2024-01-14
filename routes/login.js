const express = require('express')
let db = require("../db");
const bcrypt = require('bcrypt')
// const session = require('express-session')

const router = express.Router()



router.post('/', async function(req,res) {
    console.log(req.body)

    let login_req = `SELECT DISTINCT u.ID, u.Name, p.Password
                     FROM Users AS u
                     INNER JOIN Passwords AS p ON p.ID = u.ID
                     WHERE u.Name = ?` 
    
    let row = await db.get(login_req, req.body.uname);
    if (!row) {
        res.send("uname_error")
        console.log("Username not found")
        return
    }
    console.log(row)

    bcrypt.compare(req.body.pswd, row.Password, function(err, result) {
        if(result == true) {
            req.session.ID = row.ID
            console.log("Success! ID is %d", req.session.ID)
            res.send("success")
        }
        else{
            console.log("Password is not correct")
            res.send("pswd_error")
        }
    });
    return

});

module.exports = router;
const express = require('express')
let db = require("../db");
const path = require('path');
const bcrypt = require('bcrypt')
const default_char = require('../default_character.json')

const router = express.Router()


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/create_account.html'));
});

router.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, "../Public/create_account_success.html"));
})


// router.get('/invalid_username', (req, res) => {
//     res.sendFile(path.join(__dirname, '../Public/create_account_invalid_user.html'));
// })

router.post('/', async function(req,res) {
    console.log(req.body);
    let email= req.body.email;
    let uname= req.body.uname;
    let pswd= req.body.pswd;
    let check_uname = `SELECT Name
                      FROM [Users]
                      WHERE Name = ?`

    
    let row = await db.get(check_uname, uname)
    console.log("here?")
    if (row !== undefined) {
        console.log("Username already present in db")
        res.send("invalid_uname")
        return;
    }
    let check_email = `SELECT Email
                      FROM [Users]
                      WHERE Email = ?`
    row = await db.get(check_email, email);
    if (row !== undefined) {
        console.log("Email already present in db");
        res.send("invalid_email")
        return;
    }

    let create_user = `INSERT INTO Users (name, email, verified)
                       VALUES(?, ?, 0)`
    
    await db.set(create_user, [uname, email]);

    let get_id = `SELECT Name, ID 
                  FROM [Users]
                  WHERE name = ?`

    new_user = await db.get(get_id, uname);

    let store_pswd = `INSERT INTO Passwords (ID, Password)
    VALUES(?, ?)`
    
    let hash = await new Promise((resolve, reject) => {
        bcrypt.hash(pswd, 10, async (err, hash)  => {
            resolve(hash)
    });
    }) 

    await db.set(store_pswd, [new_user.ID, hash])

    let create_default_chars = `INSERT INTO Characters (User_ID, Character_ID, data)
                                VALUES (?,?,?)`
    for(let i = 0; i < 3; i++) {
        await db.set(create_default_chars, [new_user.ID, i+1, JSON.stringify(default_char)])
    }
    console.log("success!")
    res.send("success")
});

module.exports = router;
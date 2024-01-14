const express = require('express')
let db = require("../db");
const path = require('path');

const router = express.Router()

router.get('/', async function (req, res) {
    res.sendFile(path.join(__dirname, '../Public/character_select.html'))
})

router.get('/retrieve', async function (req, res) {
    console.log("retrieving characters...")
    
    if(!req.session.ID) {
        res.send("no_login")
        return
    }
    user_id = req.session.ID
    const get_chars = `SELECT data FROM Characters
                       WHERE User_ID = ?`;
    rows = await db.all(get_chars, user_id);
    let send_data = [];
    for(let i = 0; i< 3; i++) {
        filename = JSON.parse(rows[i].data).pfp_filename
        charname = JSON.parse(rows[i].data).Name
        send_data[i] = {"Name":charname, "filename":filename}
    }
    console.log(send_data)
    res.send(send_data)
})

router.post('/retrieve', async function (req,res) {
    if(!req.session.ID) {
        res.send("no_login");
        return
    }
    console.log(req.body)
    req.session.Character = req.body.char_id
    console.log("sending sheet...")
    res.send("success")
})

router.get('/sheet', async function (req,res) {
    res.sendFile(path.join(__dirname, '../Public/sheet.html'))
})

router.get('/sheet/data', async function (req, res) {
    if(!req.session.ID) {
        res.send("no_login");
    }
    else if(!req.session.Character) {
        res.send("no_char");
    }
    else {
        let get_data = `SELECT data FROM Characters
                        WHERE User_ID = ? AND Character_ID = ?`
        let row = await db.get(get_data, [req.session.ID, req.session.Character])
        console.log("sending character data...")
        data = JSON.parse(row.data)
        console.log(data)
        res.send(data)
    }
    return
})



module.exports = router;
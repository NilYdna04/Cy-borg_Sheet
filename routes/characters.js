const express = require('express')
let db = require("../db");
const path = require('path');

const fs = require('fs')
const fileUpload = require('express-fileupload');

const crypto = require('crypto')

const router = express.Router()



router.use(fileUpload());

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

router.post('/sheet/save', async function (req, res) {
    
    let save_json = `UPDATE Characters
                     SET data = ?
                     WHERE User_ID = ? AND Character_ID = ?`
    console.log(JSON.stringify(req.body))
    await db.set(save_json, [JSON.stringify(req.body), req.session.ID, req.session.Character])
    res.send("saved")
})

router.post('/sheet/save/pfp', async function (req,res) {
    let new_pfp;
    let prev_pfp;

    let get_data = `SELECT data FROM Characters
                        WHERE User_ID = ? AND Character_ID = ?`
    let row = await db.get(get_data, [req.session.ID, req.session.Character])
    let data_json = JSON.parse(row.data)

    let newfn = crypto.randomBytes(15).toString('hex');
    
    prev_pfp = __dirname + '/Public/images/' + data_json.pfp_filename;
    new_pfp = __dirname + '/Public/images/' + newfn

    let pfp_file = req.files.pfp

    console.log(prev_pfp)
    console.log(new_pfp)
    // pfp_file.mv(new_pfp, async function(err) {
    //     // TODO change the data
    //     if(err) {
    //         console.log("error")
    //         res.send("error")
    //         return
    //     }
    //     fs.unlinkSync(prev_pfp)
    //     data_json.pfp_filename = newfn;
    //     let save_json = `UPDATE Characters
    //                  SET data = ?
    //                  WHERE User_ID = ? AND Character_ID = ?`
    //     await db.set(save_json, [JSON.stringify(data_json), req.session.ID, req.session.Character])
    //     res.send("uploaded");
    // });
})

router.get('/sheet/logout', async function (req,res) {
    req.session.ID = null;
    req.session.Character = null;
    res.send("logout")
})

module.exports = router;
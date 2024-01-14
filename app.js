const express = require('express');
const sqlite3 = require('better-sqlite3')
const db = require("./db");

const path = require('path');
const first = require("./firstmodule");

const characters = require('./routes/characters');
const login = require('./routes/login');
const create = require('./routes/create_account');

const sqlite = require("better-sqlite3");
const session = require("express-session")

const SqliteStore = require("better-sqlite3-session-store")(session)
const session_db = new sqlite("./Cy-borg_sheet.db");



const app = express();
const port = 8080;
// let project = path.join('C:/Users/nilyd/OneDrive/Desktop/coding projects/personal/HTML Projects/Cy-borg sheet');

app.use(session({
    store: new SqliteStore({
        client: session_db,
        expired: {
            clear: true,
            intervalMs: 900000 //ms = 15min
        }
    }),
    secret: "Patchouli",
    resave: true,
    saveUninitialized: true
}));

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 


app.use(express.static("Public"))
app.use(express.static(__dirname))
app.use(express.static(__dirname))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public/index.html'));
});

app.use("/login", login);
app.use("/create_account", create);
app.use("/characters", characters);


(async () => {
    await db.init();
    app.listen(port, function () {
        console.log(`${first.hello()}`);
    });
})();

// db.close((err) => {
//     if(err) {
//         return console.error(err.message)
//     }
//     console.log("Closed Db connection")
// })
const Database = require('better-sqlite3' ,{ verbose: console.log })

let db;

async function init() {
    await new Promise((resolve, reject) => {
        db = new Database("./Cy-borg_sheet.db", {"fileMustExist": true});
        resolve() 
    });
}
// let db;

// async function init() {
//     await new Promise((resolve, reject) => {
//         db = new sqlite3.Database('...', err => {
//             if (err) reject(err);
//             else resolve();
//         }
//     });
// }

// function test() {
//     return new Promise(resolve => {
//         resolve(1);
//     });
// }

// console.log(1);
// test().then(res => {
//     console.log(2);
// });
// console.log(3);

// await test();

// function wait(ms) {
//     return new Promise(resolve => {
//         setTimeout(resolve, ms);
//     });
// }



async function get(query, params) {
    return await new Promise((resolve, reject) => {
        // console.log(query)
        stmt = db.prepare(query)
        const row = stmt.get(params)
        if(row) {
            resolve(row)
        }
        else {
            resolve()
        }
    });
};

async function all(query, params) {
    return await new Promise((resolve, reject) => {
        // console.log(query)
        stmt = db.prepare(query)
        const row = stmt.all(params)
        if(row) {
            resolve(row)
        }
        else {
            resolve()
        }
    });
} ;

async function set(query, params) {
    return await new Promise((resolve, reject) => {
        console.log(query)
        stmt = db.prepare(query)
        stmt.run(params)
        resolve()
    });
};

module.exports.init = init;
module.exports.get = get;
module.exports.set = set;
module.exports.all = all;
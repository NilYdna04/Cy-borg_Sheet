// TODO: FIX TABLE SAVING

var xmlhttp = new XMLHttpRequest;

async function logout() {
    await save_data();
    xmlhttp.open("GET", "/characters/sheet/logout", true);
    xmlhttp.send()
    xmlhttp.onreadystatechange = () => {
        if(xmlhttp.readyState === 4) {
            if(xmlhttp.response === "logout") {
                window.location.href = "http://localhost:8080"
            }
        }
    }
}

async function save_data() {
    
    data = await retrieve_data();
    
    if(data !== null) {
        update_json(data)
    }
    else {
        return;
    }
    console.log(data)
    await send_data(data)
    window.alert("data saved!")
}

async function retrieve_data() {
    return new Promise((resolve, reject) => {
        XMLHttpRequest.responseType = "json";
        xmlhttp.open("GET", "/characters/sheet/data", true);
        xmlhttp.send()
        xmlhttp.onreadystatechange = () => {
            if(xmlhttp.readyState === 4) {
                if(xmlhttp.response === "no_login") {
                    window.location.href = "http://localhost:8080"
                    return null;
                }
                else {
                    resolve(JSON.parse(xmlhttp.response));
                }
            }
        }
    })
}

function update_json(data) {
    console.log("updating data")
    update_status(data);
    update_statbar(data);
    update_desc(data);
    update_tables(data);
}

function update_status(data) {
    data.Name = document.getElementById("name").value 
    data.Health.Currhealth = document.getElementById("hp").value
    data.Health.Maxhealth = document.getElementById("maxhp").value
    data.Armor = document.getElementById("armor").value
    data.Glitches.Currglitches = document.getElementById("glitch").value 
    data.Glitches.Maxglitches = document.getElementById("maxglitch").value
    data.Money.Credits = document.getElementById("creds").value
    data.Money.Debt = document.getElementById("debt").value
}

function update_statbar(data) {
    data.Stats.Strength = document.getElementById("strength").value;
    data.Stats.Agility = document.getElementById("agility").value;
    data.Stats.Prescence = document.getElementById("prescence").value;
    data.Stats.Toughness = document.getElementById("toughness").value;
    data.Stats.Knowledge = document.getElementById("knowledge").value;
}

function update_desc(data) {
    data.Class = document.getElementById("class").value;
    data.Info = document.getElementById("info").value;
}

function update_tables(data) {
    data.Weapons = update_table("weapons");
    // console.log(data.Weapons)
    data.Apps = update_table("apps");
    data.Equipment = update_table("gear");
    data.Nanos = update_table("nanos");

}

function update_table(doc_table_id) {
    new_array = [];
    table = document.getElementById(doc_table_id);
    for(let i = 1; i < table.rows.length; i++) {
        new_row = {};
        for(let j = 0; j < table.rows[i].cells.length -1; j++) {
            new_row[table.rows[0].cells[j].textContent] = table.rows[i].cells[j].textContent;
        }
        new_array.push(new_row)
    }
    return new_array
}

async function send_data(data) {
    console.log(JSON.stringify(data))
    return new Promise((resolve, reject) => {
        XMLHttpRequest.responseType = "json";
        xmlhttp.open("POST", "/characters/sheet/save", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(data));
        xmlhttp.onreadystatechange = () => {
            if(xmlhttp.readyState === 4) {
                if(xmlhttp.response === "saved") {
                    resolve()
                }
                else {
                    reject()
                }
            }
        }
    })
        
}
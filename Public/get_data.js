var xmlhttp = new XMLHttpRequest;

function get_data() {
    XMLHttpRequest.responseType = "json";
    xmlhttp.open("GET", "/characters/sheet/data", true);
    xmlhttp.send()
    xmlhttp.onreadystatechange = () => {
        if(xmlhttp.readyState === 4) {
            if(xmlhttp.response === "no_login") {
                window.location.href = "http://localhost:8080"
            }
            else {
                char_data = JSON.parse(xmlhttp.response)
                console.log("loading json")
                load_json(char_data)
            }
        }
    }
}

function load_json(data) {
    load_pfp(data)
    load_status(data);
    load_statbar(data);
    load_desc(data);
    load_tables(data);
}

function load_pfp(data) {
    document.getElementById("pfp").src = "/Public/images/" + data.pfp_filename
}

function load_status(data) {
    document.getElementById("name").value = data.Name
    document.getElementById("hp").value = data.Health.Currhealth
    document.getElementById("maxhp").value = data.Health.Maxhealth
    document.getElementById("armor").value = data.Armor
    document.getElementById("glitch").value = data.Glitches.Currglitches
    document.getElementById("maxglitch").value = data.Glitches.Maxglitches
    document.getElementById("creds").value = data.Money.Credits
    document.getElementById("debt").value = data.Money.Debt
}

function load_statbar(data) {
    document.getElementById("strength").value = data.Stats.Strength
    document.getElementById("agility").value = data.Stats.Agility
    document.getElementById("prescence").value = data.Stats.Prescence
    document.getElementById("toughness").value = data.Stats.Toughness
    document.getElementById("knowledge").value = data.Stats.Knowledge
}

function load_desc(data) {
    document.getElementById("class").value = data.Class
    document.getElementById("info").value = data.Info
}

function load_tables(data) {
    w_classes = ['w_name', 'w_range', 'w_mags', 'w_damage', 'w_traits']
    g_classes = ['g_name', 'g_desc']
    for(let i = 0; i < data.Weapons.length; i++) {
        loadToTable('weapons', w_classes, data.Weapons[i])
    }
    for(let i = 0; i < data.Apps.length; i++) {
        loadToTable('apps', g_classes, data.Apps[i])
    }
    for(let i = 0; i < data.Equipment.length; i++) {
        loadToTable('gear', g_classes, data.Equipment[i])
    }
    for(let i = 0; i < data.Nanos.length; i++) {
        loadToTable('nanos', w_classes, data.Nanos[i])
    }
    
}

function loadToTable(table_name, classes, item) {
    data_array = []
    for (var key in item) {
        data_array.push(item[key])
    }
    
    let table = document.getElementById(table_name);
    var index = table.rows.length
    var row = table.insertRow(index)
    let num_cells = table.rows[0].cells.length -1

    for(i = 0; i < num_cells; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = `<td class="${classes[i]}"><div class="table_input" contenteditable="true">${data_array[i]}</div></td>`
    }
    row.insertCell(num_cells).innerHTML = `<input type="button" class="remove_button" onclick="removeRow(this)" value="X">`;

}

function removeRow(o) {
    var p=o.parentNode.parentNode;
         p.parentNode.removeChild(p);
}
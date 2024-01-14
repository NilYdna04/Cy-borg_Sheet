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
                load_json(char_data)
            }
        }
    }
}

function load_json(data) {
    load_status(data);
    load_statbar(data);
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
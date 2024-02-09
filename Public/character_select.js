var xmlhttp = new XMLHttpRequest;

function retrieve_characters() {
    XMLHttpRequest.responseType = "json";
    xmlhttp.open("GET", "/characters/retrieve", true);
    xmlhttp.send()
    xmlhttp.onreadystatechange = () => { 
        if (xmlhttp.readyState === 4) {
            if(xmlhttp.response === "no_login"){
                window.location.href = "http://localhost:8080"
            }
            else {
                char_data = JSON.parse(xmlhttp.response)
                console.log(char_data)
                reveal_characters(char_data)
            }   
        }
    }
}


// TODO: PUT FILENAME INTO CHARACTER JSON EDIT THE LINKS
function reveal_characters(char_data) {
    let characters = document.getElementsByClassName("character");
    for(let i = 0; i < 3; i++) {
        let character = characters[i]
        image = character.getElementsByClassName("character_image")[0]
        title = character.getElementsByClassName("charname")[0]
        
        image.src = "./images/" + char_data[i].filename
        title.textContent= char_data[i].Name
        character.style.visibility = "visible"
    }
}

function get_character(character_id) {
    xmlhttp.open("POST", "/characters/retrieve", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xmlhttp.send(JSON.stringify({"char_id" :character_id}));
    xmlhttp.onreadystatechange = () => { 
        if (xmlhttp.readyState === 4) {
            if(xmlhttp.response === "success"){
                window.location.href = "http://localhost:8080/characters/sheet"
            }
            else if(xmlhttp.reponse === "no_login"){
                window.location.href = "http://localhost:8080"
            }   
        }
    }
}

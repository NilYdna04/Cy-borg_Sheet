var xmlhttp = new XMLHttpRequest;

function login() {

    hideObject("uname_error");
    hideObject("pswd_error")

    let uname = document.getElementById("uname").value
    let password = document.getElementById("pswd").value


    if(!(uname) || !(password)){
        alert("All fields must be filled")
        return false
    }
    else {
        xmlhttp.open("POST", "/login", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({"uname": uname, "pswd":password}));
    }

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
            if(xmlhttp.response === "uname_error") {
                revealObject("uname_error")
            }
            else if(xmlhttp.response === "pswd_error") {
                revealObject("pswd_error")
            }
            else if(xmlhttp.response === "success"){
                window.location.href = "http://localhost:8080/characters"
            }
            else {
                console.log("error uh oh")
            }
        }
      };
}


function revealObject(id) {
    let element = document.getElementById(id);
    element.style.display = 'block';
}

function hideObject(id) {
    let element = document.getElementById(id);
    element.style.display = "none";
}
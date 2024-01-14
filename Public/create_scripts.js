
var xmlhttp =  new XMLHttpRequest;

function submit() {
    hideObject("uname_error");
    hideObject("email_error")

    let email = document.getElementById("email").value
    let uname = document.getElementById("uname").value
    let password = document.getElementById("pswd").value
    let pswdcheck = document.getElementById("pswd_check").value


    if(!(email) || !(uname) || !(password) || !(pswdcheck)){
        alert("All fields must be filled")
        return false
    }
    else if(password != pswdcheck) {
        alert("Password and Password Check must match")
        return false
    }
    else if(password.length <= 4) {
        alert("Password must be at least 5 characters")
        return false
    }
    else {
        xmlhttp.open("POST", "/create_account", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({ "email": email, "uname": uname, "pswd":password}));
    }

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
            if(xmlhttp.response === "invalid_uname") {
                revealObject("uname_error");
            }
            else if(xmlhttp.response === "invalid_email") {
                revealObject("email_error");
            }
            else if(xmlhttp.response === "success"){
                window.location.href= "http://localhost:8080/create_account/success"
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

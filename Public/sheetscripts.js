function max2digits(boxname) {
    var x = document.getElementById(boxname);
    if(x.value > 99) {
        x.value = 99;
    }
    else if(x.value < -99) {
        x.value = -99;
    }
}

function max1digit(boxname) {
    var x = document.getElementById(boxname);
    if(x.value > 9) {
        x.value = 9;
    }
    else if(x.value < -9) {
        x.value = -9;
    }
}

function revealObject(id) {
    hideObjects();
    let element = document.getElementById(id);
    element.style.display = 'block';
}

function hideObject(id) {
    let element = document.getElementById(id);
    element.style.display = "none";
}

function hideObjects() {
    // Hide everything
    hideObject("addWeaponMenu");
}

// function addWeapon(name, range, mags, traits) {
//     let form = document.getElementById("addWeapon");
//     let table = document.getElementById("table");
//     form.addEventListener('submit', (e)=>{
//         e.preventDefault();
        
//     })
// }

function weaponTableAdd() {
    let table = document.getElementById("weapons");
    let form = document.getElementById("addWeapon");
    let name = document.getElementById("addWeaponName").value;
    let range = document.getElementById("addWeaponRange").value;
    let mags = document.getElementById("addWeaponMags").value;
    let damage = document.getElementById("addWeaponDamage").value;
    let traits = document.getElementById("addWeaponTraits").value;

    var row = table.insertRow(table.rows.length);
    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = range;
    row.insertCell(2).innerHTML = mags;
    row.insertCell(3).innerHTML = damage;
    row.insertCell(4).innerHTML = traits;
    row.insertCell(5);

    form.reset();
    hideObject("addWeaponMenu")
}
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
    // TODO: Hide everything when clicked off
    hideObject("addWeaponMenu");
}


function addToTable(table, form, menu) {
    let form_obj = document.getElementById(form);
    params = Array.from(form_obj.elements);
    addRow(table, params);

    form_obj.reset();
    hideObject(menu)
}

function addRow(table_name, params) {
    let table = document.getElementById(table_name);
    var index = table.rows.length
    var row = table.insertRow(index)
    for(i = 0; i < params.length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = '<input type="text">'
        cell.value = params[i].value
    }
    row.insertCell(params.length).innerHTML = `<input type="button" class="remove_button" onclick="removeRow('${table_name}','${index}')" value="X">`;

}

function removeRow(table_name, index) {
    let table = document.getElementById(table_name);
    table.deleteRow(index);
}
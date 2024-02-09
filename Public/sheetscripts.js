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


function addToTable(table_name, classes, data) {
    let table = document.getElementById(table_name);
    var index = table.rows.length
    var row = table.insertRow(index)
    let num_cells = table.rows[0].cells.length -1
    for(i = 0; i < num_cells; i++) {
        let cell = row.insertCell(i);
        if(i < data.length){
            cell.innerHTML = `<td class="${classes[i]}"><div class="table_input" contenteditable="true">${data[i]}</div></td>`
        }
        else{
            cell.innerHTML = `<td class="${classes[i]}"><div class="table_input" contenteditable="true"></div></td>`
        }
    }
    row.insertCell(num_cells).innerHTML = `<input type="button" class="remove_button" onclick="removeRow(this)" value="X">`;

}

function removeRow(o) {
    var p=o.parentNode.parentNode;
         p.parentNode.removeChild(p);
}

function addNano() {
    addToTable('nanos', ['g_name', 'g_desc'], ["POWER://"])
    addToTable('nanos', ['g_name', 'g_desc'], ["INFESTATION://"])
}

function upload_pfp() {
    document.getElementById('selectedFile').click();
    // document.getElementById('')
}
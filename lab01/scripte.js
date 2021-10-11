$('.on').click(function () {
    if ($('.lol').hasClass('lol_on')) {
        return
    }
    $('.lol').removeClass('lol_off')
    $('.lol').addClass('lol_on')
})

$('.off').click(function () {
    if ($('.lol').hasClass('lol_off')) {
        return
    }
    $('.lol').removeClass('lol_on')
    $('.lol').addClass('lol_off')
})





const table_s = document.querySelector('#symtable');
const table_i = document.querySelector('#inztable');
const inz_plus = document.querySelector('#inz_plus');
const inz_minus = document.querySelector('#inz_minus');
let trows = table_s.rows
let trows_i = table_i.rows
let sym_rows = 2;
let sym_cols = 2;
let inz_rows = 2;
let inz_cols = 1;
let inz_y_name = 1;

let nor = true

$('#switcher_nor').click(function () {
    nor = true
})

$('#switcher_or').click(function () {
    nor = false
})

$('#sym_plus').click(function () {

    if (sym_cols <= 10) {

        table_i.insertRow(-1);
        if (inz_cols == 1) {
            cell = trows_i[inz_rows].insertCell(0);
            newText = document.createTextNode('x' + inz_rows);
            cell.appendChild(newText);


        }
        else {
            for (let i = 0; i < inz_cols; ++i) {
                if (i == 0) {
                    cell = trows_i[inz_rows].insertCell(i);
                    newText = document.createTextNode('x' + inz_rows);
                    cell.appendChild(newText);
                }
                else {
                    cell = trows_i[inz_rows].insertCell(i).innerText = 0;

                }
            }
        }
        inz_rows++
        for (let i = 0; i < sym_rows; ++i) {
            if (i == 0) {
                let cell = trows[i].insertCell(sym_cols);
                let newText = document.createTextNode('x' + sym_cols);
                cell.appendChild(newText).innerText = 0;
                i++;
            }
            trows[i].insertCell(sym_cols).innerText = 0;
        }
        table_s.insertRow(-1);
        for (let i = 0; i <= sym_cols; ++i) {
            if (i == 0) {
                cell = trows[sym_rows].insertCell(i);
                newText = document.createTextNode('x' + sym_cols);
                cell.appendChild(newText);
                i++;
            }
            trows[sym_rows].insertCell(i).innerText = 0;
        }
        sym_cols++;
        sym_rows++;
    }


})

$('#sym_minus').click(function () {

    if (sym_rows == 2) {
        return alert('you can`t')
    }
    for (let i = 0; i < sym_rows; i++) {
        trows[i].deleteCell(sym_cols - 1)
    }
    table_s.deleteRow(sym_rows - 1);
    table_i.deleteRow(sym_rows - 1);
    sym_cols--
    sym_rows--
    inz_rows--

})

table_s.addEventListener('click', function (e) {

    const cell = e.target.closest('td');
    if (!cell) { return; } // Quit, not clicked on a cell
    const row = cell.parentElement;
    console.log(row.rowIndex, cell.cellIndex);
    let row_i = row.rowIndex
    let cel_i = cell.cellIndex


    if (row.rowIndex == 0 || cell.cellIndex == 0) {
        return
    }

    if (nor) {
        if (row_i != cel_i) {
            table_s.rows[cel_i].cells[row_i].innerText = Number(cell.innerText) + 1
        }

        cell.innerText = Number(cell.innerText) + 1;


    }
    else {
        cell.innerText = Number(cell.innerText) + 1;
    }
    in_inz_tabel(row_i, cel_i);

});

table_s.addEventListener('contextmenu', function (e) {
    
        const cell = e.target.closest('td');
        if (!cell) { return; } // Quit, not clicked on a cell
        const row = cell.parentElement;
        console.log(row.rowIndex, cell.cellIndex);
        let row_i = row.rowIndex
        let cel_i = cell.cellIndex
        if (row.rowIndex == 0 || cell.cellIndex == 0) {
            return
        }
        if (cell.innerText == 0) {
            return
        }
        let cc = false, rr = false
        if(nor && row_i != cel_i)
        {
            for (let i = 1; i < table_i.rows[0].cells.length; i++) {
                for (let j = 1; j < table_i.rows.length; ++j) {
                    if (table_i.rows[j].cells[i].innerText == 1 && j == cel_i) {
                        cc = true
                        
                    }
                    if (table_i.rows[j].cells[i].innerText == 1 && j == row_i) {
                        rr = true
                    }
    
                }
                if (cc && rr) {
                    for (let k = 0; k < table_i.rows.length; k++) {
                        table_i.rows[k].deleteCell(i);
                        
                    }
                    cc = false, rr = false
                    inz_cols--;
                    table_s.rows[cel_i].cells[row_i].innerText = Number(cell.innerText) - 1
                    cell.innerText = Number(cell.innerText) - 1
                    return
                }
    
            }
        }
        if(!nor){
            for (let i = 1; i < table_i.rows[row_i].cells.length; i++) {
                if(table_i.rows[row_i].cells[i].innerText == 1 && table_i.rows[cel_i].cells[i].innerText == -1){
                    table_i.rows[row_i].cells[i].innerText = 0;
                    table_i.rows[cel_i].cells[i].innerText = 0;
                    table_s.rows[row_i].cells[cel_i].innerText = 0;
                    for (let k = 0; k < table_i.rows.length; k++) {
                        table_i.rows[k].deleteCell(i);
                    }
                    inz_cols--;
                    
                    return
                }
            }
        }
        if(!cc && !rr){
            for (let i = 1; i < table_i.rows[0].cells.length; i++) {
                for (let j = 1; j < table_i.rows.length; ++j) {
                    if (table_i.rows[j].cells[i].innerText == 2 && j == cel_i) {
                        cc = true;
                    }
                }
                if (cc) {
                    for (let k = 0; k < table_i.rows.length; k++) {
                        table_i.rows[k].deleteCell(i);
                    }
                    inz_cols--;
                    
                    cell.innerText = Number(cell.innerText) - 1
                    return
                }
            }
        }
});

inz_plus.addEventListener('click', function () {
    if (inz_cols <= 10) {
        for (let i = 0; i < inz_rows; ++i) {
            if (i == 0) {
                let cell = trows_i[i].insertCell(inz_cols);
                let newText = document.createTextNode('y' + inz_y_name);
                cell.appendChild(newText);
                i++;
            }
            trows_i[i].insertCell(inz_cols).innerText = 0;
        }
        inz_cols++;
        inz_y_name++;
    }
})

inz_minus.addEventListener('click', function () {
    let s_row = 0;
    let s_cel = 0;
    let one_count = 0
    if (inz_cols == 1) {
        return alert('you can`t')
    }
    for (let i = 1; i < table_i.rows.length; ++i) {
        if (table_i.rows[i].cells[inz_cols-1].innerText == 2) {
            s_row = s_cel = i;
            table_s.rows[s_cel].cells[s_row].innerText = Number(table_s.rows[s_cel].cells[s_row].innerText) - 1
        }
    }
    if(nor){
        if(s_row == 0){
            for (let i = 1; i < table_i.rows.length; ++i) {
                if (table_i.rows[i].cells[inz_cols-1].innerText == 1) {
                    one_count++
                }
            }
        }
        if (one_count == 2) {
            for (let i = 1; i < table_i.rows.length; ++i) {
                if (table_i.rows[i].cells[inz_cols-1].innerText == 1 && s_row == 0) {
                    s_row = i
                    i++;
                }
                if (table_i.rows[i].cells[inz_cols-1].innerText == 1 && s_row != 0) {
                    s_cel = i
                }
            }
            table_s.rows[s_row].cells[s_cel].innerText = Number(table_s.rows[s_row].cells[s_cel].innerText) - 1
            table_s.rows[s_cel].cells[s_row].innerText = Number(table_s.rows[s_cel].cells[s_row].innerText) - 1
        }
    }
    else{
        for(let i = 1; i < table_i.rows.length; i++){
            if(table_i.rows[i].cells[inz_cols-1].innerText == -1){
                s_cel = i; 
            }
            if(table_i.rows[i].cells[inz_cols-1].innerText == 1){
                s_row = i;
            }
        }
        if(s_cel && s_row){
            table_s.rows[s_row].cells[s_cel].innerText = Number(table_s.rows[s_row].cells[s_cel].innerText) - 1
        }
    }
    for (let i = 0; i < inz_rows; i++) {
        trows_i[i].deleteCell(inz_cols - 1)
    }
    inz_cols--
})



table_i.addEventListener('click', function (e) {
    
    const cell = e.target.closest('td');
    if (!cell) { return; } // Quit, not clicked on a cell
    const row = cell.parentElement;
    let row_i = row.rowIndex;
    let cel_i = cell.cellIndex;
    console.log(row.rowIndex, cell.cellIndex);
    if (row.rowIndex == 0 || cell.cellIndex == 0) {
        return
    }
    let s_row = 0;
    let s_cel = 0;
    let one_count = 0;
    if (nor) {
        
        for (let i = 1; i < table_i.rows.length; ++i) {
            if (table_i.rows[i].cells[cel_i].innerText == 2) {
                table_s.rows[i].cells[i].innerText = Number(table_s.rows[i].cells[i].innerText) - 1
                table_i.rows[i].cells[cel_i].innerText = 0
            }
        }
        for (let i = 1; i < table_i.rows.length; ++i) {
            if (table_i.rows[i].cells[cel_i].innerText == 1) {
                one_count++
            }
        }
        if(one_count == 2 && e.target.innerText == 1){
            return
        }
        table_i.rows[row_i].cells[cel_i].innerText = 1
        if (one_count == 1) {
            for (let i = 1; i < table_i.rows.length; ++i) {
                if (table_i.rows[i].cells[cel_i].innerText == 1 && s_row == 0) {
                    s_row = i
                    i++;
                }
                if (table_i.rows[i].cells[cel_i].innerText == 1 && s_row != 0) {
                    s_cel = i
                }
            }
            table_s.rows[s_row].cells[s_cel].innerText = Number(table_s.rows[s_cel].cells[s_row].innerText) + 1
            table_s.rows[s_cel].cells[s_row].innerText = Number(table_s.rows[s_cel].cells[s_row].innerText) + 1
        }
        if (one_count == 2) {
            table_i.rows[row_i].cells[cel_i].innerText = 0;
            for (let i = 1; i < table_i.rows.length; ++i) {
                if (table_i.rows[i].cells[cel_i].innerText == 1 && s_row == 0) {
                    table_i.rows[i].cells[cel_i].innerText = 0
                    s_row = i
                    i++;
                }
                if (table_i.rows[i].cells[cel_i].innerText == 1 && s_row != 0) {
                    table_i.rows[i].cells[cel_i].innerText = 0
                    s_cel = i
                }
            }
            table_s.rows[s_row].cells[s_cel].innerText = Number(table_s.rows[s_row].cells[s_cel].innerText) - 1
            table_s.rows[s_cel].cells[s_row].innerText = Number(table_s.rows[s_cel].cells[s_row].innerText) - 1
            table_i.rows[row_i].cells[cel_i].innerText = 1;
        }
        
    }
    else{

            for(let i = 1; i < table_i.rows.length; i++){
                if(table_i.rows[i].cells[cel_i].innerText == -1){
                    s_cel = i; 
                }
                if(table_i.rows[i].cells[cel_i].innerText == 1){
                    s_row = i;
                }
            }
            
            if(e.target.innerText == 0 && s_row != 0 && s_cel != 0){
                for(let i = 1; i < table_i.rows.length; i++){
                    table_i.rows[i].cells[cel_i].innerText = 0
                }
                e.target.innerText = Number(e.target.innerText) + 1
                table_s.rows[s_row].cells[s_cel].innerText = Number(table_s.rows[s_row].cells[s_cel].innerText) - 1;
            }
            else if(e.target.innerText == 0 && s_row == 0 && s_cel == 0){
                for(let i = 1; i < table_i.rows.length; i++){
                    if(table_i.rows[i].cells[cel_i].innerText == 2){
                        table_s.rows[i].cells[i].innerText = Number(table_s.rows[i].cells[i].innerText) - 1
                        table_i.rows[i].cells[cel_i].innerText = 0;
                    }
                }
                e.target.innerText = 1
            }
            else if(e.target.innerText == 0 && s_cel != 0){
                e.target.innerText = 1
                table_s.rows[row_i].cells[s_cel].innerText = Number(table_s.rows[row_i].cells[s_cel].innerText) + 1
            }
            else if(e.target.innerText == 0 && s_cel != 0){
                e.target.innerText = Number(e.target.innerText) + 1
                table_s.rows[row_i].cells[s_cel].innerText = Number(table_s.rows[row_i].cells[s_cel].innerText) + 1
            }
            else if(e.target.innerText == 1 && s_cel != 0){
                for(let i = 1; i < table_i.rows.length; i++){
                    table_i.rows[i].cells[cel_i].innerText = 0
                }
                e.target.innerText = 2
                table_s.rows[s_row].cells[s_cel].innerText = Number(table_s.rows[s_row].cells[s_cel].innerText) - 1;
                table_s.rows[row_i].cells[row_i].innerText = Number(table_s.rows[row_i].cells[row_i].innerText) + 1
            }
            else if(e.target.innerText == 1 && s_cel == 0){
                e.target.innerText = 2
                table_s.rows[row_i].cells[row_i].innerText = Number(table_s.rows[row_i].cells[row_i].innerText) + 1
            }
            else if(e.target.innerText == 2) {
                return
            }
            else{
                for(let i = 1; i < table_i.rows.length; i++){
                    if(table_i.rows[i].cells[cel_i].innerText == 2){
                        table_i.rows[i].cells[cel_i].innerText = 0
                        table_s.rows[i].cells[i].innerText = Number(table_s.rows[i].cells[i].innerText) - 1
                        e.target.innerText = 1
                        break
                    }    
                }
            }
    }

});
table_i.addEventListener('contextmenu', function (e) {
    
    const cell = e.target.closest('td');
    if (!cell) { return; } // Quit, not clicked on a cell
    const row = cell.parentElement;
    let row_i = row.rowIndex;
    let cel_i = cell.cellIndex;
    let s_row = 0;
    let s_cel = 0;
    let one_count = 0;
    console.log(row.rowIndex, cell.cellIndex);
    
    if (row.rowIndex == 0 || cell.cellIndex == 0) {
        return
    }
    if (nor) {
        for (let i = 1; i < table_i.rows.length; ++i) {
            if (table_i.rows[i].cells[cel_i].innerText == 1) {
                one_count++
            }
        }
        if (one_count == 2) {

            for (let i = 1; i < table_i.rows.length; ++i) {
                if (table_i.rows[i].cells[cel_i].innerText == 1 && s_row == 0) {
                    table_i.rows[i].cells[cel_i].innerText = 0
                    s_row = i
                    i++;
                }
                if (table_i.rows[i].cells[cel_i].innerText == 1 && s_row != 0) {
                    table_i.rows[i].cells[cel_i].innerText = 0
                    s_cel = i
                }
            }
            table_s.rows[s_row].cells[s_cel].innerText = 0
            table_s.rows[s_cel].cells[s_row].innerText = 0
        }
        for (let i = 1; i < table_i.rows.length; ++i) {
            if (table_i.rows[i].cells[cel_i].innerText == 2) {
                table_s.rows[i].cells[i].innerText = Number(table_s.rows[i].cells[i].innerText) - 1
            }
            table_i.rows[i].cells[cel_i].innerText = 0
        }
        table_i.rows[row_i].cells[cel_i].innerText = Number(table_i.rows[row_i].cells[cel_i].innerText) + 2
        table_s.rows[row_i].cells[row_i].innerText = Number(table_s.rows[row_i].cells[row_i].innerText) + 1
    }
    else{
        for(let i = 1; i < table_i.rows.length; i++){
            if(table_i.rows[i].cells[cel_i].innerText == -1){
                s_cel = i; 
            }
            if(table_i.rows[i].cells[cel_i].innerText == 1){
                s_row = i;
            }
        }
        if(e.target.innerText == 0 && s_row != 0 && s_cel != 0){
            for(let i = 1; i < table_i.rows.length; i++){
                table_i.rows[i].cells[cel_i].innerText = 0
            }
            e.target.innerText = Number(e.target.innerText) - 1
            table_s.rows[s_row].cells[s_cel].innerText = Number(table_s.rows[s_row].cells[s_cel].innerText) - 1;
        }
        else if(e.target.innerText == 0 && s_row == 0 && s_cel == 0){
            for(let i = 1; i < table_i.rows.length; i++){
                if(table_i.rows[i].cells[cel_i].innerText == 2){
                    table_s.rows[i].cells[i].innerText = Number(table_s.rows[i].cells[i].innerText) - 1
                    table_i.rows[i].cells[cel_i].innerText = 0;
                }
            }
            e.target.innerText = -1
        }
        else if(e.target.innerText == 0 && s_row != 0){
            e.target.innerText = -1
            table_s.rows[s_row].cells[row_i].innerText = Number(table_s.rows[s_row].cells[row_i].innerText) + 1
        }
        else if(e.target.innerText == 0 && s_cel != 0){
            e.target.innerText = Number(e.target.innerText) - 1
            table_i.rows[s_cel].cells[cel_i].innerText = 0
        }
        else if(e.target.innerText == 1 && s_cel != 0){
            for(let i = 1; i < table_i.rows.length; i++){
                table_i.rows[i].cells[cel_i].innerText = 0
            }
            e.target.innerText = Number(e.target.innerText) - 1
            table_s.rows[s_row].cells[s_cel].innerText = Number(table_s.rows[s_row].cells[s_cel].innerText) - 1;
        }
        else if(e.target.innerText == 1 && s_cel == 0){
            e.target.innerText = Number(e.target.innerText) - 1
        }
        else if(e.target.innerText == 2) {
            e.target.innerText = Number(e.target.innerText) - 1
            table_s.rows[row_i].cells[row_i].innerText = Number(table_s.rows[row_i].cells[row_i].innerText) - 1
        }
        else{
            for(let i = 1; i < table_i.rows.length; i++){
                if(table_i.rows[i].cells[cel_i].innerText == 2){
                    table_i.rows[i].cells[cel_i].innerText = 0
                    table_s.rows[i].cells[i].innerText = Number(table_s.rows[i].cells[i].innerText) - 1
                    e.target.innerText = -1
                    break
                }    
            }
        }
    }

});

function in_inz_tabel(row, cell) {

    for (let i = 0; i < inz_rows; ++i) {
        if (i == 0) {
            let cell = trows_i[i].insertCell(inz_cols);
            let newText = document.createTextNode('y' + inz_y_name);
            cell.appendChild(newText);
            i++
        }
        if (i == row) {
            if (cell == row) {
                trows_i[i].insertCell(inz_cols).innerText = 2
            }
            else {
                trows_i[i].insertCell(inz_cols).innerText = 1
            }
        }
        else if (i == cell && nor) {
            trows_i[i].insertCell(inz_cols).innerText = 1
        }
        else if (i == cell && !nor) {
            trows_i[i].insertCell(inz_cols).innerText = -1
        }
        else {
            trows_i[i].insertCell(inz_cols).innerText = 0;
        }
    }
    inz_cols++;
    inz_y_name++;
}



const clear = document.querySelector('#clear');
const orr = document.querySelector("#switcher_or");
const norr = document.querySelector("#switcher_nor");
function clean() {

    for (let i = 0; i < sym_rows; i++) {
        for (let j = sym_cols - 1; j > 1; j--) {
            trows[i].deleteCell(j)
        }
    }
    for (let i = 0; i < inz_rows; i++) {
        for (let j = inz_cols - 1; j > 0; j--) {
            trows_i[i].deleteCell(j)
        }
    }
    for (let i = sym_rows - 1; i > 1; i--) {
        table_s.deleteRow(i);
        table_i.deleteRow(i);
    }
    table_s.rows[1].cells[1].innerText = 0
    sym_rows = 2;
    sym_cols = 2;
    inz_rows = 2;
    inz_cols = 1;

}


const noContext = document.querySelector('.noContextMenu');

noContext.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});


function build_graph() {
    const table_s = document.querySelector('#symtable')

    var nodes = [
    ];


    var edges = [
    ];

    function template_nodes(id, label) {
        this.id = id;
        this.label = label;
    }

    for (let i = 0; i < table_s.rows.length - 1; i++) {
        if (table_s.rows.length == 2) {
            let temp_n = new template_nodes(i + 1, "x" + (i + 1));
            nodes.push(temp_n);
            break
        }
        else {
            let temp_n = new template_nodes(i + 1, "x" + (i + 1));
            nodes.push(temp_n);
        }
    }

    function template_edges(id, from, to) {
        this.id = id;
        this.from = from;
        this.to = to;
    }
    let s_cel = s_row = 0;
    let temp_e;
    if(nor){
        for (let i = 1; i < table_i.rows[0].cells.length; i++) {
                for (let j = 1; j < table_i.rows.length; ++j) {
                    if(table_i.rows[j].cells[i].innerText == 1 && !s_cel){
                        s_cel = j;
                    }
                    else if(table_i.rows[j].cells[i].innerText == 1){
                        s_row = j;
                    }
                    else if(table_i.rows[j].cells[i].innerText == 2){
                        s_row = s_cel = j;
                    }
                }
                if(s_row){
                    temp_e = new template_edges('y' + i,s_cel,s_row)
                    edges.push(temp_e);
                }
                s_cel = s_row = 0;
        }
    }
    else{
        for (let i = 1; i < table_i.rows[0].cells.length; i++) {
            for (let j = 1; j < table_i.rows.length; ++j) {
                if(table_i.rows[j].cells[i].innerText == 1 && !s_cel){
                    s_cel = j;
                }
                else if(table_i.rows[j].cells[i].innerText == -1){
                    s_row = j;
                }
                else if(table_i.rows[j].cells[i].innerText == 2){
                    s_row = s_cel = j;
                }
            }
            if(s_row){
                temp_e = new template_edges('y' + i,s_cel,s_row)
                edges.push(temp_e);
            }
            s_cel = s_row = 0;
    }
    }


    var container = document.getElementById("graph");

    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options_nor = {}
    var options_or = {
        nodes: {
            font: {
              size: 22
            },
            borderWidth: 3
          },
          edges: {
            font: {
              align: "top"
            },
            smooth: {
              type: "dynamic",
              forceDirection: "horizontal",
              roundness: 0.0
            },
            arrows: {
              to: { enabled: true, scaleFactor: 1, type: "arrow" }
            }
          },
          layout: {
            hierarchical: {
              direction: "LR",
              sortMethod: 'directed'
            }
          },
          interaction: {
            tooltipDelay: 200,
            hover: true
          },
          physics: {
            enabled: false
          }
    };

    if(nor){
        var network = new vis.Network(container, data, options_nor);
    }
    else{
        var network = new vis.Network(container, data, options_or);
    }
    clear.addEventListener('click', function () {
        network.destroy();
    })
    norr.addEventListener('click', function () {
        network.destroy();
    })
    orr.addEventListener('click', function () {
        network.destroy();
    })
}




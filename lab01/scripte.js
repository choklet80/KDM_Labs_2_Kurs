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

// create an array with nodes
let N_id = 7;
var nodes = new vis.DataSet([
    { id: 1, label: "x1" },
    { id: 2, label: "x2" },
    { id: 3, label: "x3" },
    { id: 4, label: "x4" },
    { id: 5, label: "x5" },
    { id: 6, label: "x6" },
]);

// create an array with edges
let E_id = "y";
var edges = new vis.DataSet([
    { id: "y1", from: 1, to: 2 },
    { id: "y2", from: 1, to: 2 },
    { id: "y3", from: 2, to: 4 },
    { id: "y4", from: 2, to: 5 },
]);

// create a network
var container = document.getElementById("graph");

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges,
};
var options = {
    manipulation: {
        enabled: true,


    },
};
var op = {
    manipulation: {
        enabled: false,

    }
}

// initialize your network!
var network = new vis.Network(container, data, options);

let count_X = 1;
let count_Y = 1;



let table_s = document.querySelector('#symtable');
let table_i = document.querySelector('#inztable');
let trows = table_s.rows
let trows_i = table_i.rows
let sym_rows = 2;
let sym_cols = 2;
let inz_rows = 2;
let inz_cols = 1;
$('#sym_plus').click(function () {

    table_i.insertRow(-1);
    if (inz_cols == 1) {
        cell = trows_i[inz_rows].insertCell(0);
        newText = document.createTextNode('x' + inz_rows);
        cell.appendChild(newText);

        
    }
    else{
        for(let i = 0; i < inz_cols; ++i){
            if(i == 0){
                cell = trows_i[inz_rows].insertCell(i);
                newText = document.createTextNode('x' + inz_rows);
                cell.appendChild(newText);
            }
            else{
                cell = trows_i[inz_rows].insertCell(i);
            }
        }
    }
    inz_rows++
    for (let i = 0; i < sym_rows; ++i) {
        if (i == 0) {
            let cell = trows[i].insertCell(sym_cols);
            let newText = document.createTextNode('x' + sym_cols);
            cell.appendChild(newText);
            i++;
        }
        trows[i].insertCell(sym_cols);
    }
    table_s.insertRow(-1);
    for (let i = 0; i <= sym_cols; ++i) {
        if (i == 0) {
            cell = trows[sym_rows].insertCell(i);
            newText = document.createTextNode('x' + sym_cols);
            cell.appendChild(newText);
            i++;
        }
        trows[sym_rows].insertCell(i);
    }
    sym_cols++;
    sym_rows++;

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
const tbody_s = document.querySelector('#symtable');
tbody_s.addEventListener('click', function (e) {
    const cell = e.target.closest('td');
    if (!cell) { return; } // Quit, not clicked on a cell
    const row = cell.parentElement;
    console.log(row.rowIndex, cell.cellIndex);
    newText = document.createTextNode('1');
    if (cell.innerText == 1 || row.rowIndex == 0 || cell.cellIndex == 0) {
        return
    }
    cell.appendChild(newText);
});



$('#inz_plus').click(function () {
    for (let i = 0; i < inz_rows; ++i) {
        if (i == 0) {
            let cell = trows_i[i].insertCell(inz_cols);
            let newText = document.createTextNode('y' + inz_cols);
            cell.appendChild(newText);
            i++;
        }
        trows_i[i].insertCell(inz_cols);
    }
    inz_cols++;
})

$('#inz_minus').click(function () {
    if (inz_cols == 1) {
        return alert('you can`t')
    }
    for (let i = 0; i < inz_rows; i++) {
        trows_i[i].deleteCell(inz_cols - 1)
    }
    inz_cols--

})
const tbody_i = document.querySelector('#inztable');
tbody_i.addEventListener('click', function (e) {
    const cell = e.target.closest('td');
    if (!cell) { return; } // Quit, not clicked on a cell
    const row = cell.parentElement;
    console.log(row.rowIndex, cell.cellIndex);
    newText = document.createTextNode('1');
    if (cell.innerText == 1 || row.rowIndex == 0 || cell.cellIndex == 0) {
        return
    }
    cell.appendChild(newText);
});

const clear = document.querySelector('#clear');
clear.addEventListener('click', function(){
    for (let i = 0; i < sym_rows; i++) {
        for(let j = sym_cols - 1; j > 1; j--){
            trows[i].deleteCell(j)
        }
    }
    for (let i = 0; i < inz_rows; i++) {
        for(let j = inz_cols-1; j > 0; j--){
            trows_i[i].deleteCell(j)
        }
    }
    for(let i = sym_rows - 1; i > 1; i--){
        table_s.deleteRow(i);
        table_i.deleteRow(i);
    }
    sym_rows = 2;
    sym_cols = 2;
    inz_rows = 2;
    inz_cols = 1;
})
// let N_id = 7;
//       var nodes = new vis.DataSet([
//         { id: 1, label: "x1" },
//         { id: 2, label: "x2" },
//         { id: 3, label: "x3" },
//         { id: 4, label: "x4" },
//         { id: 5, label: "x5" },
//         { id: 6, label: "x6" },
//       ]);

//       // create an array with edges
//       let E_id = "y";
//       var edges = new vis.DataSet([
//         { id: "y1", from: 1, to: 2 },
//         { id: "y2", from: 1, to: 2 },
//         { id: "y3", from: 2, to: 4 },
//         { id: "y4", from: 2, to: 5 },
//       ]);

//       // create a network
//       var container = document.getElementById("draw-field");

//       // provide the data in the vis format
//       var data = {
//         nodes: nodes,
//         edges: edges,
//       };
//       var options = {
//         manipulation: {
//           enabled: true,
//           addNode: function (nodeData, callback) {
//             nodeData.id = id++;

//             callback(nodeData);
//           },
//           addNode: function (nodeData, callback) {
//             nodeData.id = id++;

//             callback(nodeData);
//           },
//         },
//       };
//       var op = {
//         manipulation: {
//           enabled: false,

//         }
//       }

//       // initialize your network!
//       var network = new vis.Network(container, data, options);
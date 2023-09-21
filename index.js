const grid = document.getElementById("grid");
const resetBtn = document.getElementById("reset");
let lock = false;
let dimension = 10;
generateGrid();

// generate grid
function generateGrid() {
    lock = false;
    grid.innerHTML = "";
    for (let i = 0; i < dimension; i++) {
        row = grid.insertRow(i);
        for (let j = 0; j < dimension; j++) {
            cell = row.insertCell(j)
            cell.onclick = function () { check(this); };
            let mine = document.createAttribute("mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        }
    }
    createMines();
}


// create mines
function createMines() {
    for (let i = 0; i < 20; i++) {
        let row = Math.floor(Math.random() * dimension);
        let col = Math.floor(Math.random() * dimension);
        let cell = grid.rows[row].cells[col];
        cell.setAttribute("mine", "true")
    }
}

// reveal mines
function revealMines() {
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            let cell = grid.rows[i].cells[j];
            if (cell.getAttribute("mine") == "true") {
                cell.className = "mine";
            }
        }
    }
}

// check complete game
function completeGame() {
    let complete = true;
    for (let i = 0; i < dimension; i++) {
        for (let j = 0; j < dimension; j++) {
            let cell = grid.rows[i].cells[j];
            if ((cell.getAttribute("mine") == "false") && (cell.innerHTML === "")) {
                complete = false;
            }
        }
    }

    if (complete) {
        revealMines();
        alert("You won dawg!");
    }
}

// check cell
function check(cell) {
    if (lock) {
        return;
    } else {
        if (cell.getAttribute("mine") == "true") {
            revealMines();
            lock = true;
        } else {
            cell.className = "active";
            // count mines around
            var mineCount = 0;
            var cellRow = cell.parentNode.rowIndex;
            var cellCol = cell.cellIndex;

            for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, dimension - 1); i++) {
                for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, dimension - 1); j++) {
                    if (grid.rows[i].cells[j].getAttribute("mine") == "true") {
                        mineCount++;
                    }
                }
            }
            cell.innerHTML = mineCount;

            // open safe surrounding cells
            if (mineCount == 0) {
                // if cell don't have mine
                for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, dimension - 1); i++) {
                    for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, dimension - 1); j++) {
                        if (grid.rows[i].cells[j].innerHTML == "") {
                            check(grid.rows[i].cells[j]);
                        }
                    }
                }
            }
        completeGame()
        }
    }
}

resetBtn.onclick = generateGrid;
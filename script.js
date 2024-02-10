var box;
var currentScore = 0;
var rows = 4;
var columns = 4;
document.addEventListener('DOMContentLoaded', function () {
    var highScore = localStorage.getItem('2048-highScore') || 0;
    document.getElementById('high-score').innerText = highScore;
});

window.onload = function () {
    game();
}

function game() {
    box = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            let num = box[i][j];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    Two();
    Two();
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        left();
        Two();
    }
    else if (e.code == "ArrowRight") {
        right();
        Two();
    }
    else if (e.code == "ArrowUp") {
        up();
        Two();
    }
    else if (e.code == "ArrowDown") {
        down();
        Two();
    }
    updateScore(currentScore);
})

function filterZero(row) {
    return row.filter(num => num != 0);
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            currentScore += row[i];
        }
    }
    row = filterZero(row);
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function left() {
    for (let i = 0; i < rows; i++) {
        let row = box[i];
        row = slide(row);
        box[i] = row;
        for (let j = 0; j < columns; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = box[i][j];
            updateTile(tile, num);
        }
    }
}

function right() {
    for (let i = 0; i < rows; i++) {
        let row = box[i];
        row.reverse();
        row = slide(row)
        box[i] = row.reverse();
        for (let j = 0; j < columns; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = box[i][j];
            updateTile(tile, num);
        }
    }
}

function up() {
    for (let j = 0; j < columns; j++) {
        let row = [box[0][j], box[1][j], box[2][j], box[3][j]];
        row = slide(row);
        for (let i = 0; i < rows; i++) {
            box[i][j] = row[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = box[i][j];
            updateTile(tile, num);
        }
    }
}

function down() {
    for (let j = 0; j < columns; j++) {
        let row = [box[0][j], box[1][j], box[2][j], box[3][j]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let i = 0; i < rows; i++) {
            box[i][j] = row[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = box[i][j];
            updateTile(tile, num);
        }
    }
}

function updateScore(score) {
    document.getElementById("current-score").innerText = score;
    let highScore = localStorage.getItem('2048-highScore') || 0;
    if (score > highScore) {
        highScore = score;
        document.getElementById("high-score").innerText = highScore;
        localStorage.setItem('2048-highScore', highScore);
    }
}


function Two() {
    if (!EmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (box[r][c] == 0) {
            box[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            found = true;
        }
    }
}

function EmptyTile() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (box[i][j] == 0) {
                return true;
            }
        }
    }
    return false;
}

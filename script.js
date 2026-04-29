const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    updateStatusText();
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    updateStatusText();
}

function updateStatusText() {
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    statusText.className = 'status';
    statusText.classList.add(currentPlayer.toLowerCase() + '-turn');
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            winningCells = condition;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins!`;
        statusText.className = 'status win';
        
        // Highlight winning cells
        winningCells.forEach(index => {
            cells[index].classList.add('winner');
        });
        
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        statusText.className = 'status draw';
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    
    updateStatusText();
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o', 'winner');
    });
    
    running = true;
}

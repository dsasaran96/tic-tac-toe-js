const X_CLASS = 'x';
const O_CLASS = 'o';
const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements_div = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winMsgText = document.querySelector('[data-win-msg-text');
const winMsgElem = document.getElementById('winMsg');
const restartBtn = document.getElementById('restartBtn');
const playerBtn = document.getElementById('player');
const aiBtn = document.getElementById('ai');
let oTurn;

function startGame() {
    oTurn = false;
    cellElements_div.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoardHoverClass();
    aiBtn.classList.remove('hide');
    winMsgElem.classList.remove('show');
}

function startGamePlayer() {
    oTurn = false;
    cellElements_div.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true })
    });
    setBoardHoverClass();
    winMsgElem.classList.remove('show');
    aiBtn.classList.add('hide');
}

restartBtn.addEventListener('click', startGame);
playerBtn.addEventListener('click', startGamePlayer);

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;

//place mark
    placeMark(cell, currentClass)

//check for win
    if(checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) { //check for tie
        endGame(true);
    } else { //switch turns
    swapTurns();
    setBoardHoverClass();
    }
}

function isDraw() {
    return [...cellElements_div].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}

function endGame(draw) {
    if (draw) {
        winMsgText.innerText = 'Draw!';
    } else {
        winMsgText.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    winMsgElem.classList.add('show');
}

function placeMark (cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WIN_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements_div[index].classList.contains(currentClass)
        })
    })
}
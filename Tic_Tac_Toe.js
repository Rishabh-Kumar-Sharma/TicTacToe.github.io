let turn = "X";
let isgameOver = false;
let winner;
let ting = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let div = document.getElementById('turn');
let player1 = false;
let player2 = false;

const changeTurn = () => {
    return turn == "X" ? "0" : "X";
}
const isgameComplete = () => {
    let count1 = 0;
    let boxtexts = document.getElementsByClassName("boxtext");
    for (let a = 0; a < 9; a++)
        if (boxtexts[a].innerText != '')
            count1++;
    if (count1 == 9)
        return true;
    return false;
}

// Function to check for a win
const checkResult = () => {
    let boxtexts = document.getElementsByClassName("boxtext");
    const win = [
        [0, 1, 2, 2, 4.8, 0],
        [0, 3, 6, -8.2, 14.8, 90],
        [0, 4, 8, 1.8, 14.8, 45],
        [1, 4, 7, 1.85, 14.8, 90],
        [2, 5, 8, 12, 14.8, 90],
        [3, 4, 5, 2, 14.8, 0],
        [6, 7, 8, 2, 24.8, 0],
        [2, 4, 6, 1.8, 14.8, 135]
    ];
    win.forEach((e) => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText === boxtexts[e[2]].innerText) && boxtexts[e[0]].innerText !== '') {
            isgameOver = true;
            setTimeout(() => {
                gameOver.play();
            }, 500);
            winner = boxtexts[e[0]].innerText;
            if (winner === "X") {
                player1 = true;
                div.innerText = winner + " wins";
            } else if (winner === "0") {
                player2 = true;
                div.innerText = winner + " wins";
            }
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector(".line").style.width = "26.3vw";
            document.querySelector(".img").style.width = "60%";
        } else if (isgameComplete()) {
            if (((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText !== boxtexts[e[2]].innerText)) || ((boxtexts[e[0]].innerText === boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText !== boxtexts[e[1]].innerText)) || ((boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) && (boxtexts[e[0]].innerText !== boxtexts[e[2]].innerText))) {
                isgameOver = true;
                div.innerText = "Game drawn! Press restart to play again!"
            }
        }
    })
}

const turnDisplay = (turn1) => {
    div.innerText = "Turn for " + turn1;
}

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '')
            if (!isgameOver) {
                turnDisplay(turn);
                boxtext.innerText = turn;
                ting.play();
                turn = changeTurn();
                checkResult();
                if (!isgameOver) {
                    turnDisplay(turn);
                }
            } else {
                if (player1 || player2)
                    alert(winner + " has already won... Press restart to play again!");
            }

    });
});

let restart = document.getElementById('btn');
restart.addEventListener('click', restartHandler);

function restartHandler() {
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach((element) => {
        let boxtext = element.querySelector('.boxtext');
        boxtext.innerText = '';
        turn = "X";
        turnDisplay(turn);
        isgameOver = false;
        player1 = false;
        player2 = false;
        document.querySelector(".line").style.width = "0vw";
        document.querySelector(".img").style.width = "0%";
    })
}
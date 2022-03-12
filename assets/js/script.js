var startGameButton = document.getElementById("start-game");

const questions = {
    question1: {
        question: "lorem ipsum",
        choice1: "",
        coice2: "",
        choice3: "",
        choice4: "",
        correctAnswer: "choice1"
    },
    question2: {
        question: "lorem ipsum",
        choice1: "",
        coice2: "",
        choice3: "",
        choice4: "",
        correctAnswer: "choice2"
    },
    question3: {
        question: "lorem ipsum",
        choice1: "",
        coice2: "",
        choice3: "",
        choice4: "",
        correctAnswer: "choice3"
    },
    question4: {
        question: "lorem ipsum",
        choice1: "",
        coice2: "",
        choice3: "",
        choice4: "",
        correctAnswer: "choice4"
    },
}

var leaderboard = {};
const totatTime = 10;
var timeLeft = totatTime;

// 
function init() {
    JSON.parse(getLocalLeaderboard());
}

// gets any saved leaderboard data from local storage and stores it in current session
function getLocalLeaderboard() {
    localStorage.getItem();
}

// saves any new leaderboard resaults to local storage
function setLocalLeaderboard() {
    localStorage.serItem();
}

// 
function renderLeaderBoard() {

}

// 
function startGame() {

    gameClock()
}

// handles game count down and time out 
function gameClock() {
    var timer = setInterval( () => {
        if (timeLeft === 0) {
            clearInterval(timer);
        }
    }, 1000)
}

//call init() function straight off the bat
init()

//events
startGameButton.addEventListener("click", () => {
    window.location.href = './quiz.html';
    startGame();
})
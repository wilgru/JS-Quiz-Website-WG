var startGameButton = document.getElementById("start-game");
var leaderboardList = document.getElementById("leaderboard-list");
var leaderboardListInitials = document.getElementById("leaderboard-list-initials");
var leaderboardListTime = document.getElementById("leaderboard-list-time");
var leaderboardListCorrect = document.getElementById("leaderboard-list-correct");

var leaderboard = [];

// upon loading, get any scores stored in local storage and render them from the get go
function init() {
    leaderboard = JSON.parse(getLocalLeaderboard());
}

// gets any saved leaderboard data from local storage and stores it in current session
function getLocalLeaderboard() {
    for (let i = 0; i < localStorage.length; i++) {
        leaderboard.push(JSON.parse(localStorage[i]));
    }
    sortLeaderboard()
}

// sort the leaderboard object by score and then by time -- insertion sort
function sortLeaderboard() {
    for(let i = 1; i < leaderboard.length; i++){

        //Go through the elements behind it
        for(let j = i-1; j >= 0; j--){
            
            //value comparison using asc order
            if(leaderboard[j + 1].time > leaderboard[j].time){
                //swap
                [leaderboard[j+1],leaderboard[j]] = [leaderboard[j],leaderboard[j + 1]];

            } else if (leaderboard[j + 1].time === leaderboard[j].time) {
                if(leaderboard[j + 1].correct > leaderboard[j].correct){
                    //swap
                    [leaderboard[j+1],leaderboard[j]] = [leaderboard[j],leaderboard[j + 1]];
                }
            }
        }
    }
}

// renders the leaderboard
function renderLeaderboard() {
    getLocalLeaderboard()

    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = "<p> No leaderboard scores yet. Click 'Start Quiz' to play and save a score here! <p>"
    
    } else {
        for (i = 0; i < leaderboard.length; i++) {
            leaderboardListInitials.innerHTML = leaderboardListInitials.innerHTML + "<p>" + leaderboard[i].initials + "</p>"
            leaderboardListTime.innerHTML = leaderboardListTime.innerHTML + "<p>" + leaderboard[i].time + "</p>"
            leaderboardListCorrect.innerHTML = leaderboardListCorrect.innerHTML + "<p>" + leaderboard[i].correct + "</p>"
        }
    }
}

renderLeaderboard()

//event listeners
startGameButton.addEventListener("click", () => {
    window.location.href = './quiz.html';
})
var questionH2 = document.getElementById("question-h2");
var choicesList = document.getElementById("choices-list");
var saveScoreCard = document.getElementById("save-score-card");
var choiceOutcomeP = document.getElementById("choice-outcome");
var timeLeftP = document.getElementById("time-left");
var progressP = document.getElementById("progress");
var initialsForm = document.getElementById("initials-entry-form");
var yourScoreHeader = document.getElementById("your-score-header");

const questions = {
    question1: {
        question: "How would you define an object in JavaScript?",
        choices: {
            choice1: "var myObj = {};",
            choice2: "var myObj = Object.newObject();",
            choice3: "Object.newObject(myObj);",
            choice4: "var myObj = [];",
        },
        correctAnswer: "1"
    },
    question2: {
        question: "What is the difference between the '==' and the '===' comparitive operators?",
        choices: {
            choice1: "one compares type regardless of the values, the other compares value regardless of the types",
            choice2: "one compares type and value, while the other compares only value regardless of the types",
            choice3: "both do the same thing, but one is the older syntax of the other",
            choice4: "one compares type and value, the other compares size regardless of the values or thhe types",
        },
        correctAnswer: "2"
    },
    question3: {
        question: "Which of the following is NOT considered 'falsy'?",
        choices: {
            choice1: "0",
            choice2: "\"\"",
            choice3: "'false'",
            choice4: "null",
        },
        correctAnswer: "3"
    },
    question4: {
        question: "Say 'myObj' is an object variable with key value pairs defined in it, which of the following returns a list of keys in an object?",
        choices: {
            choice1: "myObj.keys()",
            choice2: "Object.myObj.keys()",
            choice3: "myObj[0]",
            choice4: "Object.keys(myObj)",
        },
        correctAnswer: "4"
    },
}

// question related variables
var currentChoiceButtons;
var currentQuestionIndex;
var currentQuestion;
var currentAnswer;
var progress;

// time related variables
const totatTime = 60;
var timer;
var timeLeft = totatTime;

// user's choice related variables
var chosenChoice;
var answereSelected = false;
var correctChoices = 0;

// functions
// main game start function
function startGame() {
    currentQuestionIndex = 0;
    currentQuestion = Object.keys(questions)[currentQuestionIndex];
    progress = 1;
    progressP.innerHTML = "<strong>Progress: </strong>" + progress + "/" + Object.keys(questions).length;
    timeLeftP.innerHTML = "<strong>Time Left: </strong>" + timeLeft;

    renderQuestion() // renders the first question and the buttons
    gameClock() // starts game clock
}

// end the game
function endGame() {
    clearInterval(timer);

    questionH2.textContent = "Quiz Finished!"
    choicesList.style.display = "none";
    choiceOutcomeP.textContent = "";
    saveScoreCard.style.display = "block";
    yourScoreHeader.textContent = "Your score: " + timeLeft;
}

// handles game count down and time out 
function gameClock() {
    timer = setInterval( () => {

        // if time is up, 
        if (timeLeft === 0) {
            clearInterval(timer); // stop timer

            fadeButtonsOut() // fade the buttons out

            questionH2.textContent = "Times out!"
            timeLeftP.innerHTML = "<strong>Time Left: </strong> 0" 
            answereSelected = true; // stop user form pressing any buttons
            
            setTimeout(() => { // call ennd of game after 2 secs
                endGame() // call end game sequence
            }, 2000);

        } else {
            // otherwise decrement counter and display the time left
            timeLeft--;
            timeLeftP.innerHTML = "<strong>Time Left: </strong>" + timeLeft

            // if time is a quater left then change it to red
            if (timeLeft <= totatTime/4) {
                timeLeftP.style.color = "red"; 
            }
        }
    }, 1000)
}

// render the current question and each option as a button for the current question
function renderQuestion() {
    answereSelected = false;

    // render the current question text
    questionH2.innerHTML = 'Question ' + (currentQuestionIndex+1) + ': <br>' + questions[currentQuestion].question;

    // empty the list and get the choices for the current question ready
    choicesList.textContent = '';
    var currentChoices = Object.values(questions[currentQuestion].choices);

    // render each button, then get the button with the correct answer in it, a list of all the buttons and then give the buttons their event listeners
    for (let i = 0; i < currentChoices.length; i++) { 
        var newChoiceButton = document.createElement('button');
        
        newChoiceButton.innerText = currentChoices[i];
        newChoiceButton.setAttribute("id", i+1);

        var newChoiceLi = document.createElement('li');
        newChoiceLi.appendChild(newChoiceButton);
        choicesList.appendChild(newChoiceLi);
    }

    // get all buttons and add event listeners to them
    currentChoiceButtons = document.querySelectorAll("button");
    currentAnswer = document.getElementById(questions[currentQuestion].correctAnswer);
    
    renderButtonEventListeners(); // render event listeners for every button on the page currently

    restoreButtonStyles() // restore all buttons style to full opacity and no colour
}

// render the next question
function renderNextQuestion () {
    // reset and increment variables ready for next round (next 'renderQuestion' call)
    answereSelected = false;
    currentQuestionIndex++;
    currentQuestion = Object.keys(questions)[currentQuestionIndex];
    currentAnswer = document.getElementById(questions[currentQuestion].correctAnswer);

    renderQuestion() // render next question
}

// restore all buttons style to full opacity and no colour
function restoreButtonStyles() {
    // return each button to full transparency and colours to normal colours
    for (let i = 0; i < currentChoiceButtons.length; i++) {
        var button = currentChoiceButtons[i];

        button.style.transition = "none";
        button.style.opacity = "100";
        button.style.backgroundColor = "white";
        button.style.color = "black";
        button.style.borderColor = "black";
    }

    // remove the outcome text
    choiceOutcomeP.innerText = "";
}

// gray styling to every button
function grayOutButtons() {
    for (let i = 0; i < currentChoiceButtons.length; i++) {
        var button = currentChoiceButtons[i];

        button.style.backgroundColor = "lightgray";
        button.style.color = "darkgray";
        button.style.borderColor = "darkgray";
    }
}

// green styling for the correctly selected button
function correctGuess() {
    grayOutButtons() // grays out all the buttons first

    chosenChoice.style.backgroundColor = "green";
    chosenChoice.style.color = "darkgreen";
    chosenChoice.style.borderColor = "darkgreen";

    choiceOutcomeP.textContent = "Correct!"

    correctChoices++;
}

// red styling for the incorrectly selected button and green styling for the correct button
function incorrectGuess() {
    grayOutButtons() // grays out all the buttons first

    timeLeft = timeLeft - 10;
    timeLeftP.innerHTML = "<strong>Time Left: </strong>" + timeLeft;

    // highlight the actual correct answer too
    currentAnswer.style.backgroundColor = "green";
    currentAnswer.style.color = "darkgreen";
    currentAnswer.style.borderColor = "darkgreen";

    // highligt the incorrect answer 
    chosenChoice.style.backgroundColor = "red";
    chosenChoice.style.color = "darkred";
    chosenChoice.style.borderColor = "darkred";

    choiceOutcomeP.textContent = "Incorrect!"
}

// fade buttons out
function fadeButtonsOut() {
    for (let i = 0; i < currentChoiceButtons.length; i++) {
        var button = currentChoiceButtons[i];
        button.style.transition = "750ms";
        button.style.opacity = "0";
    }
}

// check if the selected button is correct or not
function checkChoice(event) {
    // get the number id associatied with the button selected
    chosenChoice = event.target;
    var choiceNumId = chosenChoice.id;

    // check if the number of the chosen button matches te number of te correct answer or not
    if (choiceNumId === questions[currentQuestion].correctAnswer) {
        correctGuess();
    } else {
        incorrectGuess();
    }
}

// check if the use has reahced the end of the game or not
function checkEndOfGame() {

    // wait 250ms before fading out, and wait 500ms for fade out to complete before rendering next question or end of game
    setTimeout(() => {
        fadeButtonsOut() // fade out the buttons first

        // if reached te end of the questions 
        if (currentQuestionIndex === Object.keys(questions).length-1) {
            setTimeout(() => {
                endGame(); // end game sequence
            }, 500);

        } else {
            // otherwise display the progress and then render tehe next question after 500ms
            progress++;
            progressP.innerHTML = "<strong>Progress: </strong>" + progress + "/" + Object.keys(questions).length;

            setTimeout(() => {
                renderNextQuestion(); // render next question
            }, 500);
        }
    }, 250);
}

// render an event listener for each button on the page
function renderButtonEventListeners() {
    for (let i = 0; i < currentChoiceButtons.length; i++) {
        var button = currentChoiceButtons[i];

        button.addEventListener("click", (event) => {
            if (!answereSelected) {
                answereSelected = true;
                checkChoice(event);
                checkEndOfGame();
            }
        });
    }
}

startGame();

// event for when form is submitted
initialsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    var newId = localStorage.length;
    var entry = {
        initials: initialsForm.elements['initials'].value,
        time: timeLeft,
        correct: correctChoices
    }

    //put the new score into localStorage
    localStorage.setItem( newId, JSON.stringify(entry));
    window.location = "./index.html";
})
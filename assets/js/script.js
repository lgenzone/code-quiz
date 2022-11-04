// variables
var  time = 60;
var timeRemaining = "";
var timeId;

// DOM variables

var timerEl = document.getElementById("time");
var startEl = document.getElementById("start");

startEl.addEventListener("click", function(){
    console.log("button was clicked");
    startQuiz();
});


function startQuiz() {
    // invisible start screen
    var startScreenEl = document.getElementById("intro");
    startScreenEl.setAttribute("class", "hide");
    var questionsEl = document.getElementById("questions");
    questionsEl.removeAttribute("class");
    timeRemaining = time;
    timeId = setInterval(startTimer, 1000);
    timerEl.textContent = time;

    getQuestions();
}


// start timer 
var startTimer = function() {
    time--;
    timerEl.textContent = time;

    if(time <= 0) {
        endQuiz();
    }

}

function endQuiz() {
    // hide questions div and show main scores
    clearInterval();

}

function getQuestions() { 

}

//question bank
const questionBank = [

]
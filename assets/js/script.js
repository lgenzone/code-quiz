// variables
var  time = 60;
var timeRemaining = "";
var timeId;
var questionIndex = 0;
var answerA = document.getElementById("answer-a");
var answerB = document.getElementById("answer-b");
var answerC = document.getElementById("answer-c");
var answerD = document.getElementById("answer-d");
var answerE = document.getElementById("answer-e");
var question = document.getElementById("question");
var questionsEl = document.querySelector("questions");
var answersEl = document.querySelector("#answers");
var notifyEl = document.querySelector("#notify-user");
var submitButton = document.querySelector("#submit");

// DOM variables

var timerEl = document.getElementById("time");
var startEl = document.getElementById("start");


// questions Array - create objects for each question
var questionsArray = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: ["<JavaScript>", "<Script>", "<Scripting>", "<Js>"],
        correctAnswer: "<Script>"
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        answers: ["The <head> section", "Both the <head> section and the <body> section are correct", "The <body> section"],
        correctAnswer: "Both the <head> section and the <body> section are correct"
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: ["function myFunction()", "function:myFunction()",  "function = myFunction()"],
        correctAnswer: "function myFunction()"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: ["if (i == 5)", "if i = 5", "if i = 5 then", "if i == 5 then"],
        correctAnswer: "if (i == 5)"
    },
    {
        question: "How does a FOR loop start?",
        answers: ["for (i <= 5; i++)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <= 5)"],
        correctAnswer: "for (i = 0; i <= 5; i++)"
        
    }
]

// start quiz by clicking "Start Quiz!"
startEl.addEventListener("click", function(){
    startQuiz();
}); 


function startQuiz() {
    // displays questions page and hides intro page
    var startScreenEl = document.getElementById("intro");
    startScreenEl.setAttribute("class", "hide");
    // displays questions screen 
    var questionsEl = document.getElementById("questions-page");
    questionsEl.removeAttribute("class");

    timeRemaining = time;
    // start timer
    timeId = setInterval(startTimer, 1000);
    timerEl.textContent = time;

    getQuestions();
}

var questionIndex = 0;
function getQuestions() {
    // display question from object in array
    var currentQuestion = questionsArray[questionIndex];
    //promts new question
    var questEl = document.getElementById("question");
    questEl.textContent = currentQuestion.question;

    // removes previous questions 
    answersEl.innerHTML = "";

    // calls function for each element in the questionsArray
    currentQuestion.answers.forEach(function(answer, i) {
        var choiceClick = document.createElement("button");
        choiceClick.setAttribute("class", "answer");
        choiceClick.setAttribute("value", answer);
        choiceClick.textContent = (i + 1 + ". " + answer);
        // add click event to each answer choice 
        choiceClick.onclick = checkAnswer;
        answersEl.appendChild(choiceClick);
    });

}

function checkAnswer(){
    if (this.value !== questionsArray[questionIndex].correctAnswer) {
        notifyEl.textContent = "Incorrect"
        // 5 second time penalty for incorrect answers
        time -= 5;
    } else {
        notifyEl.textContent = "Correct!"
    }
    // next question
    questionIndex++;
    // next question or end quiz 
    if (questionIndex === questionsArray.length) {
        endQuiz();
    } else {
        getQuestions();
    }
}

function endQuiz(){
    // stop timer
    clearInterval(timeId);
    // display finish screen 
    var quizFinishEl = document.getElementById("finish-screen");
    quizFinishEl.removeAttribute("class");
    // remove questions screen 
    questionsEl.setAttribute("class", "hide");
}

// timer counts down and stops when reaches zero
var startTimer = function() {
    time--;
    timerEl.textContent = time;

    if(time <= 0) {
        endQuiz();
    }

}

function logHighScore() {
    var userInitials = userInitials.value();

    if (userInitials !== "") {

     var highScoresList =
        JSON.parse(window.localStorage.getItem("highScoresList")) || [];

        var userScore = {
            score: time,
            initials: userInitials
        };
    };

    highScoresList.push(userScore);
    window.localStorage.setItem("highScoresList" , JSON.stringify(highScoresList));
}

// submit button 
submitButton.onclick = logHighScore;








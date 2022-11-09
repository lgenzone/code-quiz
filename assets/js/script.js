// variables
var  time = 60;
var timeRemaining = "";
var timeId;
<<<<<<< Updated upstream
var answerA = document.getElementById("answer-a");
var answerB = document.getElementById("answer-b");
var answerC = document.getElementById("answer-c");
var answerD = document.getElementById("answer-d");
var question = document.getElementById("question");
=======
var questionIndex = 0;
>>>>>>> Stashed changes

// DOM variables

var timerEl = document.getElementById("time");
var startEl = document.getElementById("start");
<<<<<<< Updated upstream
=======
var question = document.getElementById("question");
var questionsEl = document.querySelector("questions");
var answersEl = document.querySelector("#answers");
var notifyEl = document.querySelector("#notify-user");
var initalsEl = document.querySelector
>>>>>>> Stashed changes


// questions Array - create objects for each question
var questionsArray = [
    {
        question: 'What HTML element do we put the javascript?',
        answers: ["<Javascript>", "<Script>", "<Scripting>", "<Js>" ],
        correctAnswer: "<Script>",
    },
    {
        question: 'What HTML element do we put the javascript?',
        answers: ["<Javascript>", "<Script>", "<Scripting>", "<Js>" ],
        correctAnswer: "<Script>",
    },
    {
        question: 'What HTML element do we put the javascript?',
        answers: ["<Javascript>", "<Script>", "<Scripting>", "<Js>" ],
        correctAnswer: "<Script>",
    },
    {
        question: 'What HTML element do we put the javascript?',
        answers: ["<Javascript>", "<Script>", "<Scripting>", "<Js>" ],
        correctAnswer: "<Script>",
    },
    { 
        question: 'What HTML element do we put the javascript?',
        answers: ["<Javascript>", "<Script>", "<Scripting>", "<Js>" ],
        correctAnswer: "<Script>",
    }

   ]


startEl.addEventListener("click", function(){
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
<<<<<<< Updated upstream
=======
};
// log users intials
function logHighScore() [
    // get value of input box
    var userInitials = 
]

localStorage.setItem("initals", "lg");
localStorage.setItem("score", "13");
console.log(localStorage.getItem("initals"));


>>>>>>> Stashed changes

}

// stop timer
function endQuiz() {
    // hide questions div and show main scores
    clearInterval();

}


// displaying questions and answers from questionsArray
var questionIndex = 0;
function getQuestions() { 
    var currentQuestion = questionsArray[questionIndex];
    question.textContent = currentQuestion.question;
    
    answerA.textContent = questionsArray[questionIndex].answers[0];
    answerB.textContent = questionsArray[questionIndex].answers[1];
    answerC.textContent = questionsArray[questionIndex].answers[2];
    answerD.textContent = questionsArray[questionIndex].answers[3];

} 


function checkAnswer(selected) {
    var correctChoice = questionsArray[questionIndex].correctAnswer;
    // conditional statement 
    if(selected === correctChoice) {
        //tells user whether or not they answered correctly
        alert("You are correct!");

    } else {
        alert("Wrong");
        time -= 5;
    
    };

    if (questionIndex === questionsArray.length -1) {
        endQuiz();
    } else {
        questionIndex++;
        getQuestions();

};

answerA.addEventListener("click", function(){
    checkAnswer(answerA.textContent);
 });
 answerB.addEventListener("click", function(){
    checkAnswer(answerB.textContent);
 });
 answerC.addEventListener("click", function(){
    checkAnswer(answerC.textContent);
 });
 answerD.addEventListener("click", function(){
    checkAnswer(answerD.textContent);
 });}


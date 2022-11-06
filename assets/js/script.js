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
var answersEl = document.querySelector("#answers");

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
        correctAnswer: "if (i==5)"
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
    var questionsEl = document.getElementById("questions-page");
    questionsEl.removeAttribute("class");
    timeRemaining = time;
    // start timer
    timeId = setInterval(startTimer, 1000);
    timerEl.textContent = time;

    getQuestions();
}

/* var questionIndex = 0;
function getQuestions() { 
    var currentQuestion = questionsArray[questionIndex];
    question.textContent = currentQuestion.question;
    
    answerA.textContent = questionsArray[questionIndex].answers[0];
    answerB.textContent = questionsArray[questionIndex].answers[1];
    answerC.textContent = questionsArray[questionIndex].answers[2];
    answerD.textContent = questionsArray[questionIndex].answers[3];
    answerE.textContent = questionsArray[questionIndex].answers[4];

  // prompts new question
  var questEl = document.getElementById("question");
  questEl.textContent = currentQuestion.question;

} */

var questionIndex = 0;
function getQuestions() {
    var currentQuestion = questionsArray[questionIndex];

    var questEl = document.getElementById("question");
    questEl.textContent = currentQuestion.question;

    answersEl.innerHTML = "";

    currentQuestion.answers.forEach(function(answer, i) {
        var choiceClick = document.createElement("button");
        choiceClick.setAttribute("class", "answer");
        choiceClick.textContent = (i + 1 + ". " + answer);

        choiceClick.onclick = checkAnswer;

        answersEl.appendChild(choiceClick);
    });

}


/* function checkAnswer(selected) {
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

}; */


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



// event listeners
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


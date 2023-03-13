const startEl = document.getElementById("start");

// questions array - create objects for each question
var questionsArray = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: ["<JavaScript>", "<Script>", "<Scripting>", "<Js>"],
        correctAnswer: "<Script>"
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        answers: ["The <head> section", "Both the <head> section and the <body> section are correct", "The <body> section", "in the <footer>"],
        correctAnswer: "Both the <head> section and the <body> section are correct"
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: ["function myFunction()", "function:myFunction()",  "function = myFunction()", "(myFunction)"],
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
];

// get DOM variables
const timerEl = document.getElementById("time");
const questionsEl = document.querySelector("questions");
const questionEl = document.getElementById("question");
const answersEl = document.querySelector("#answers");
const notifyEl = document.querySelector("#notify-user");
const highscoresBtn = document.getElementById("highscores-btn");
const highscoresSection = document.getElementById("highscores-screen");

// create state object 
const state = {
    timeRemaining: 60,
    questionIndex: 0,
    userInitials: "",
    timeId: null,
    highScores: [],
  };


// initialize the quiz
const startQuiz = () => {
  // hide intro page
    hideElement(document.getElementById("intro"));
    // show questions page
    showElement(document.getElementById("questions-page"));
  // set initial time to 60 seconds
    state.timeRemaining = 60;
    state.timeId = setInterval(startTimer, 1000);
    // update timer
    timerEl.textContent = state.timeRemaining;
    // display quiz questions
    getQuestions();
  };

 

  
  // add an event listener to the start button to listen for a click event
startEl.addEventListener("click", startQuiz);

  
  // display question and answer choices
  const getQuestions = () => {
    // get current question from questionsArray using the current question from the state object
    const currentQuestion = questionsArray[state.questionIndex];
    questionEl.textContent = currentQuestion.question;
    // clear 
    answersEl.innerHTML = "";
    // iterate through current question's answers array
    currentQuestion.answers.forEach((answer, i) => {
      // create answer button
      const choiceClick = document.createElement("button");
      choiceClick.setAttribute("class", "answer");
      choiceClick.setAttribute("value", answer);
      choiceClick.textContent = `${i + 1}. ${answer}`; // set button text content to the answer text (index + 1)
      choiceClick.onclick = checkAnswer; // onclick event - check answer
      answersEl.appendChild(choiceClick);
    });
  };

  const checkAnswer = (event) => {
    // get user's answer and check if it's correct
    const userAnswer = event.target.value;
    const correctAnswer = questionsArray[state.questionIndex].correctAnswer;
    const isCorrect = userAnswer === correctAnswer;
  
    // let the user know whether or not they answered the question correctly 
    const notifyMessage = isCorrect ? "Correct!" : "Incorrect";
    notifyEl.textContent = notifyMessage;
    notifyEl.style.display = "block";
  
    // time penalty - deduct 5 seconds if the answer is incorrect
    if (!isCorrect) {
      state.timeRemaining -= 5;
      timerEl.textContent = state.timeRemaining;
    }
  
    // update the state and render the next question
    state.questionIndex++;
    // wait 1 second so the user can see the notification message
    setTimeout(() => {
      // reset notification message 
      notifyEl.style.display = "none";
      if (state.questionIndex === questionsArray.length) {
        endQuiz();
      } else {
        getQuestions();
      }
    }, 1000);
  };
  
  const startTimer = () => {
    // update timer
    state.timeRemaining--;
    timerEl.textContent = state.timeRemaining;
    // check if the time remaining is less than or equal to 0
    if (state.timeRemaining <= 0) {
      // if timer runs out, end quiz
      endQuiz();
    } else if (notifyEl.textContent === "Incorrect") {
      state.timeRemaining -= 5;
      timerEl.textContent = state.timeRemaining;
    }
  };
  


const endQuiz = () => {
    state.score = state.timeLeft;
    // hide questions page and display finish screen 
    hideElement(document.getElementById("questions-page"));
    showElement(document.getElementById("finish-screen"));
   
  };
  

  const saveHighScore = () => {
    // get users initials and score 
    const initials = document.getElementById("initials-input").value;
    // score is equal to time remaining
    const score = state.timeRemaining;
    // store initals and score in an object 
    const highScore = {
        initials, 
        score
    };
    
    // get high scores from local storage or get empty string 
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    // add new high score to high scores array
    highScores.push(highScore);
    // sort scores in descending order
    highScores.sort((a,b) => b.score - a.score);
    // store high scores array in local storage 
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // display high scores 
    showHighScores();
};


const showHighScores = () => {
    // hide start screen, questions page and finish screen 
    hideElement(document.getElementById("start-screen"));
    hideElement(document.getElementById("questions-page"));
    hideElement(document.getElementById("finish-screen"));
    // display high scores screen
    showElement(document.getElementById("highscores-screen"));
    // get high scores from local storage or empty array
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    // create table to display high scores
    const table = document.createElement("table");
    
    // create elemnent to hold table rows
    // loop through each high score in array and create a table row for each
    const tbody = document.createElement("tbody");
    highScores.forEach(highScore => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${highScore.initials}</td> <td>${highScore.score}</td>`;
        tbody.appendChild(tr);
    });
    // add tbody to table element 
    table.appendChild(tbody);
    // clear high scores list and ass new table to the list 
    document.getElementById("highscores-list").innerHTML = "";
    document.getElementById("highscores-list").appendChild(table);
};

// event listener for highscores button 
highscoresBtn.addEventListener("click", showHighScores);


// event listen for submit button 
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function() {
    saveHighScore();
    showHighScores();
});


// update high scores 
const resetHighScores = () => {
    localStorage.removeItem("highScores");
    showHighScores();
};
// hide element 
const hideElement = element => {
    if (element) {
        element.style.display = "none";
    }
};

// display element 
const showElement = element => {
    if (element) {
        element.style.display = "block";
    }
};








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
    hideElement(document.getElementById("intro"));
    showElement(document.getElementById("questions-page"));
  
    state.timeRemaining = 60;
    state.timeId = setInterval(startTimer, 1000);
    timerEl.textContent = state.timeRemaining;
  
    getQuestions();
  };

 

  
  // add an event listener to the start button to listen for a click event
startEl.addEventListener("click", startQuiz);

  
  // display question and answer choices
  const getQuestions = () => {
    const currentQuestion = questionsArray[state.questionIndex];
  
    questionEl.textContent = currentQuestion.question;
  
    answersEl.innerHTML = "";
  
    currentQuestion.answers.forEach((answer, i) => {
      const choiceClick = document.createElement("button");
      choiceClick.setAttribute("class", "answer");
      choiceClick.setAttribute("value", answer);
      choiceClick.textContent = `${i + 1}. ${answer}`;
      choiceClick.onclick = checkAnswer;
      answersEl.appendChild(choiceClick);
    });
  };

  const checkAnswer = (event) => {
    const userAnswer = event.target.value;
    const correctAnswer = questionsArray[state.questionIndex].correctAnswer;
    const isCorrect = userAnswer === correctAnswer;
  
    // Show the notification message
    const notifyMessage = isCorrect ? "Correct!" : "Incorrect";
    notifyEl.textContent = notifyMessage;
    notifyEl.style.display = "block";
  
    // Deduct 5 seconds if the answer is incorrect
    if (!isCorrect) {
      state.timeRemaining -= 5;
      timerEl.textContent = state.timeRemaining;
    }
  
    // Update the state and render the next question
    state.questionIndex++;
    setTimeout(() => {
      notifyEl.style.display = "none";
      if (state.questionIndex === questionsArray.length) {
        endQuiz();
      } else {
        getQuestions();
      }
    }, 1000);
  };
  
  const startTimer = () => {
    state.timeRemaining--;
    timerEl.textContent = state.timeRemaining;
    if (state.timeRemaining <= 0) {
      endQuiz();
    } else if (notifyEl.textContent === "Incorrect") {
      state.timeRemaining -= 5;
      timerEl.textContent = state.timeRemaining;
    }
  };
  


const endQuiz = () => {
    state.score = state.timeLeft;
    hideElement(document.getElementById("questions-page"));
    showElement(document.getElementById("finish-screen"));
   
  };
  

  const saveHighScore = () => {
    const initials = document.getElementById("initials-input").value;
    const score = state.timeRemaining;

    const highScore = {
        initials, 
        score
    };

    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScores.push(highScore);
    highScores.sort((a,b) => b.score - a.score);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    showHighScores();
};


const showHighScores = () => {
    hideElement(document.getElementById("start-screen"));
    hideElement(document.getElementById("questions-page"));
    hideElement(document.getElementById("finish-screen"));
    showElement(document.getElementById("highscores-screen"));

    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    const table = document.createElement("table");
    
    
    const tbody = document.createElement("tbody");
    highScores.forEach(highScore => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${highScore.initials}</td> <td>${highScore.score}</td>`;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    document.getElementById("highscores-list").innerHTML = "";
    document.getElementById("highscores-list").appendChild(table);
};


highscoresBtn.addEventListener("click", showHighScores);



const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function() {
    saveHighScore();
    showHighScores();
});



const resetHighScores = () => {
    localStorage.removeItem("highScores");
    showHighScores();
};

const hideElement = element => {
    if (element) {
        element.style.display = "none";
    }
};


const showElement = element => {
    if (element) {
        element.style.display = "block";
    }
};








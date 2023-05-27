var timerEl = document.querySelector("#time");
var time = 60;
var timerInterval;
var startButton = document.querySelector("#start-button");
var start = document.querySelector('#start');
var quiz = document.querySelector("#quiz");
var answerDisplay= document.querySelector("#answer-display");
var scoreDisplay =document.querySelector("#score");
var score = 0;
var currentQuestionIndex = 0;
var questions = [
  {
    question: "What is a Boolean?",
    choices: ["True or False", "A car", "Numbers", "An animal"],
    correctAnswer: 0,
  },
  {
    question: "Where is the HQ for Intel?",
    choices: ["Santa Clara", "Houston", "San Francisco", "New York"],
    correctAnswer: 0,
  },
  {
    question: "Which one of these is a coding language?",
    choices: ["Syntax", "HTML", "AWS", "Javascript"],
    correctAnswer: 3,
  },
  {
    question: "What is HTML?",
    choices: ["Pictures on a webpage", "Structure of page", "Links on a page", "The console on a page"],
    correctAnswer: 1,
  },
  // Add more question objects here
];

function startQuiz() {
  // Hide the start page
  start.style.display = "none";

  // Show the quiz page
  quiz.style.display = "block";

  // Start the timer
  timerEl.textContent = time;
  timerInterval = setInterval(function () {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizOver();
    }
  }, 1000);

  // Call a question
  populateQuestion();
}

function populateQuestion() {
  var questionEl = document.querySelector("#question");
  var choicesEl = document.querySelector("#choices");
  var currentQuestion = questions[currentQuestionIndex];

  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = ""; // Clear previous choices

  currentQuestion.choices.forEach(function (choice, index) {
    var choiceItem = document.createElement("li");
    choiceItem.textContent = choice;
    choiceItem.addEventListener("click", handleAnswerClick);
    choicesEl.appendChild(choiceItem);
  });
}



    function handleAnswerClick(event) {
      var selectedChoice = event.target;
      var selectedAnswer = selectedChoice.textContent;
      var currentQuestion = questions[currentQuestionIndex];
    
      if (currentQuestion.choices[currentQuestion.correctAnswer] === selectedAnswer) {
        // Correct answer
        selectedChoice.classList.add("correct");
        answerDisplay.textContent = "Correct!";
        score++; // Increment the score
      } else {
        // Incorrect answer
        selectedChoice.classList.add("incorrect");
        answerDisplay.textContent = "Wrong! The correct answer is: " + currentQuestion.choices[currentQuestion.correctAnswer];
      }
    
      // Wait for 1 second and then move to the next question
      setTimeout(function () {
        selectedChoice.classList.remove("correct", "incorrect");
        answerDisplay.textContent = ""; // Clear the answer display
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          populateQuestion();
        } else {
          quizOver();
        }
      }, 1000);
    }
  

function quizOver() {
  // Hide quiz screen
  quiz.style.display = "none";

  // Show end screen
  var endScreen = document.querySelector("#end-screen");
  endScreen.style.display = "block";

  // Stop timer
  clearInterval(timerInterval);
}

startButton.addEventListener("click", startQuiz);

function quizOver() {
  // Hide quiz screen
  quiz.style.display = "none";

  // Show end screen
  var endScreen = document.querySelector("#end-screen");
  endScreen.style.display = "block";

  // Stop timer
  clearInterval(timerInterval);

  // Get the player's name
  var playerName = document.querySelector("#player-name").value;

  // Retrieve the highscores from localStorage
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  // Create a new score object
  var scoreObj = {
    name: playerName,
    score: score,
  };

  // Add the score object to the highscores array
  highscores.push(scoreObj);

  // Sort the highscores array in descending order based on the score
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Store the updated highscores back to localStorage
  localStorage.setItem("highscores", JSON.stringify(highscores));

  // Display the highscores
  displayHighscores();
}
function displayHighscores() {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  var highscoreList = document.querySelector("#highscore-list");
  highscoreList.innerHTML = "";

  highscores.forEach(function (scoreObj) {
    var listItem = document.createElement("li");
    listItem.textContent = scoreObj.name + " - " + scoreObj.score;
    highscoreList.appendChild(listItem);
  });
}
var submitButton = document.querySelector("#submit-score");
submitButton.addEventListener("click", quizOver);

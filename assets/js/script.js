//document query selectors to target HTML elements

var start = document.querySelector("#start-button");
var question = document.querySelector(".quiz");
var answers = document.querySelector(".answer-section")
var answerA = document.querySelector("#answerA");
var answerB = document.querySelector("#answerB");
var answerC = document.querySelector("#answerC");
var answerD = document.querySelector("#answerD");
var time = document.querySelector(".timer");
var result = document.querySelector(".result");
var highscores = document.querySelector(".highscore");
var highscoreList = document.querySelector(".score-list");

//quiz questions as array of objects

var quizQuestions = [
    {
        question: "In terms of a webpage, Javascript is responsible for which of the following?",
        answers: ["Style", "Function", "Structure", "Fornatting"],
        correctAnswer: "Function"
    },
    {
        question: "What does DOM stand for?",
        answers: ["Document Object Model", "Direct Original Match", "Debug Open Module", "None of the above"],
        correctAnswer: "Document Object Model"
    },
    {
        question: "Which is the proper notation of a 'for loop' in Javascript?",
        answers: ["for (i = 0, i > x, i+1;)", "for i in range var x:", "for (var i = 0; i < x; i++)", "for i = 0, let i++"],
        correctAnswer: "for (var i = 0; i < x; i++)"
    },
    {
        question: "What would you use to comment out a section of code in Javascript?",
        answers: ["<!-- -->", "#", "//", "/**/"],
        correctAnswer: "//"
    }
    ,
    {
        question: "Where is it best to link the script.js file element in an HTML document??",
        answers: ["Inside of <head>", "After </html>", "Outside of the document, on GitHub", "At the end right before </body>"],
        correctAnswer: "At the end right before </body>"
    }
]

var questionIndex = 0;
var score = 0;
var count = 60;
var timer;
var scoreList = [];

//Timer function
function countdown() {
    timer = setInterval(function () {
        count--;
    time.textContent = "Time:" + count;
    if (count === 0) {
        clearInterval(timer);
        onEnd()
    }
    }, 1000); 

}


function onStart() {
    start.setAttribute("style", "display: none");
    answers.setAttribute("style", "display: inline");
    countdown()
    quiz()
}

function quiz() {

var questionObj = quizQuestions[questionIndex]
if (!questionObj) {
    onEnd()
    return;
}
var currentQuestion = questionObj.question
question.textContent = currentQuestion;
answerA.textContent = questionObj.answers[0];
answerB.textContent = questionObj.answers[1];
answerC.textContent = questionObj.answers[2];
answerD.textContent = questionObj.answers[3];

}

//handles when user chooses their answer
function handleAnswerSubmission (event) {
    if (event.target.textContent === quizQuestions[questionIndex].correctAnswer) {
        score++;
        result.textContent = "Correct"
        result.setAttribute("style","color: white; background-color: green");
        
    } else {
        count -= 5;
        result.textContent = "Incorrect"
        result.setAttribute("style", "color: white; background-color: red");
    }  
    
    //allows user time to receive feedback, calls quiz function for next question
    setTimeout(function(){ 
        result.textContent = ""
        questionIndex++
        quiz()
    }, 1000)
    
    
    }

//triggers if time runs out or all questions completed
function onEnd() {
    clearInterval(timer);
    time.textContent = ""
    question.textContent = "Done! You Scored: " + score + " out of " + (quizQuestions.length);
    answers.setAttribute("style", "display: none");
    setTimeout(function(){ 
        enterHighscore()
    }, 3000)
}


function enterHighscore() {
    question.textContent = "Please enter your initials";
    answers.setAttribute("style", "display: none");

    //text field to enter initials
    var initials = document.createElement("input");
    initials.setAttribute("type", "text");
    initials.className = "initials";
    document.body.appendChild(initials);
    initials = document.querySelector(".initials");

    //submit button for highscores creates object and saves into empty array then saves into local storage
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "button");
    submitBtn.className = "submitBtn";
    submitBtn.textContent = "Submit"
    document.body.appendChild(submitBtn);
    submitBtn = document.querySelector(".submitBtn");
    submitBtn.addEventListener("click", function() {

        var playerScore =
        {
        name: initials.value,
        score: score
        };

        playerScore.name = initials.value;
        scoreList.push(playerScore);
        localStorage.setItem("highscore", JSON.stringify(scoreList));
        initials.value = "Submitted!";
    }

    

    )
    

  //play again button
    var playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("type", "button");
    playAgainBtn.className = "playAgainBtn";
    playAgainBtn.textContent = "Play Again"
    document.body.appendChild(playAgainBtn);
    playAgainBtn = document.querySelector(".playAgainBtn");
    playAgainBtn.addEventListener("click", function() {
        questionIndex = 0;
        count = 60;
        score = 0;
        initials.remove()
        submitBtn.remove();
        playAgainBtn.remove();
        onStart()
    })
    
    
}

//event listeners for all buttons on page
start.addEventListener("click", onStart)
answerA.addEventListener("click", handleAnswerSubmission )
answerB.addEventListener("click", handleAnswerSubmission)
answerC.addEventListener("click", handleAnswerSubmission)
answerD.addEventListener("click", handleAnswerSubmission)

// checks highscore list
highscores.addEventListener("click", function() 
{
    answers.setAttribute("style", "display: none");
    question.textContent = "Highscore List";
    var list = localStorage.getItem("highscore");
    list = JSON.parse(list);
    list.sort((a,b) => {return b.score-a.score})

    for (var i = 0; i < list.length; i++) {
        var highscore = document.createElement("li");
        highscore.className= "score-list";
        highscore.innerText = list[i].name + ", " + list[i].score;
        question.appendChild(highscore);
    }
    }
    
)
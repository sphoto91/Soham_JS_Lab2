function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex=0;
}
Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.questionIndex];
}
Quiz.prototype.isEnded = function(){
    return this.questionIndex === this.questions.length;
}
Quiz.prototype.checkOptionWithAnswer = function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

function Questions(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Questions.prototype.isCorrectAnswer = function(choice){
    return this.answer === choice;
}

function loadQuestions(){
    if(Quiz.isEnded()){
        showScores();
    }
    else{
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text;
        var choices = quiz.getQuestionByIndex().choices;
        for(var i = 0; i < choices.length; i++){
            var element = document.getElementById("choice"+i);
            element.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }
        showProgress();
    }
}
function handleOptionButton(id, choice){
    var button = document.getElementById(id);
    button.onclick = function(){
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}    
function showProgress(){
    var currentQuestionNumber =quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question"+ currentQuestionNumber + " of " + quiz.questions.length;
}
function showScores(){
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your Scores : "+ quiz.score + ".And mark percentage is: " + (quiz.score/questions.length*100) + "%"+"</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
}
var questions=[
    new Questions("Javascript Supports?", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Questions("JWhich language is used for styling web pages?", ["HTML", "XML", "CSS", "Jquery"], "CSS"),
    new Questions("Which is not a Javascript Framework?", ["Python", "Jquery", "Django", "NodeJS"], "NodeJS"),
    new Questions("Which is used for Connecting to Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Questions("Javascript is a?", ["Language", "Programming Language", "Development", "All"], "Programming Language"),
];
var quiz = new Quiz(questions);
loadQuestions();
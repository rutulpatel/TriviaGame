//https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple API for questions
$(function() {

    var questionId = "#question";
    var queContainerClass = ".question-container";
    var ansContainerClass = ".answer-container";
    var data = {
        1: {
            id: 1,
            question: "In what place was Christmas once illegal?",
            choices: [
                "England",
                "France",
                "Brazil",
                "Russia"
            ],
            answer: "England"
        },
        2: {
            id: 2,
            question: "In California, it is illegal to eat oranges while doing what?",
            choices: [
                "Bathing",
                "Driving",
                "Gardening",
                "Working on a computer"
            ],
            answer: "Bathing"
        },
        3: {
            id: 3,
            question: "What is 1,000,000 divided by 0?",
            choices: [
                "0",
                "1",
                "Infinity",
                "1,000,000"
            ],
            answer: "Infinity"
        },
        4: {
            id: 4,
            question: "What are the odds of being killed by space debris?",
            choices: [
                "1 in 1 trillion",
                "1 in 5 million",
                "1 in 5 billion",
                "1 in 10 billion"
            ],
            answer: "1 in 5 billion"
        },
        5: {
            id: 5,
            question: "Which of the following is the longest running American animated TV show?",
            choices: [
                "TV Funhouse",
                "Rugrats",
                "Simpsons",
                "Pokemon"
            ],
            answer: "Simpsons"
        }

    };

    var triviaHtmlComponents = {
        addQuestion: function(parentContainer, childText, childId, queNum) {
            var h2Component = $("<h2>").attr("id", childId).attr("que-num", queNum).text(childText);
            $(parentContainer).html(h2Component);
        },
        choiceClasses: "col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 choice",
        addAnswers: function(parentContainer, childText, childId) {
            var aComponent = $("<a>").attr("class", this.choiceClasses)
                .attr("id", childId)
                .attr("href", "#")
                .attr("data-bs-hover-animate", "pulse") 
                .text(childText);
            var h3Component = $("<h3>").html(aComponent);
            var divComponent = $("<div>").attr("class", "row").html(h3Component);
            $(parentContainer).append(divComponent);
        }
    };

    var timerInterval, timerTimeout;
    var gameTimer = {
        maxSec: (15),
        time: 0,
        startTimer: function() {
            timerInterval = setInterval(gameTimer.countTimer, 1000);
            timerTimeout = setTimeout(gameTimer.stopTimer, gameTimer.maxSec * 1000);
        },
        stopTimer: function() {
            console.log("stop");
            clearInterval(timerInterval);
            clearTimeout(timerTimeout);
        },
        resetTimer: function() {
            clearInterval(timerInterval);
            gameTimer.time = 0;
            gameTimer.updateHTML(gameTimer.maxSec);
        },
        countTimer: function() {
            gameTimer.time++;
            console.log(gameTimer.time);
            gameTimer.updateHTML(gameTimer.maxSec - gameTimer.time);
        },
        updateHTML: function(data) {
            $("#timeRem").text(data);
        }
    }

    var triviaGame = {
        questionNumber: 0,
        loadData: function(dataObj) {
            gameTimer.resetTimer();
            gameTimer.startTimer();
            $(queContainerClass).html("");
            $(ansContainerClass).html("");
            triviaHtmlComponents.addQuestion(queContainerClass, dataObj.question, "question", dataObj.id);
            for (var i = 0; i < dataObj.choices.length; i++) {
                console.log(dataObj.choices[i]);
                triviaHtmlComponents.addAnswers(ansContainerClass, dataObj.choices[i], "choice" + (i + 1));
            }
            triviaGame.checkAnswer();
        },
        checkAnswer: function() {
            $(".choice").on("click", function() {
                console.log($(this).text());
                gameTimer.stopTimer();
                if ($(this).text() === data[$(questionId).attr("que-num")].answer) {
                    console.log("Your answer is correct");
                } else {
                    console.log("Your answer is incorrect");
                }
                console.log(parseInt($(questionId).attr("que-num")) + 1);
                if ((parseInt($(questionId).attr("que-num")) + 1) < 6) {
                    triviaGame.loadData(data[(parseInt($(questionId).attr("que-num")) + 1)]);
                }
            });
        },
        startGame: function() {
            this.loadData(data[1]);
        }
    };

    triviaGame.startGame();
});
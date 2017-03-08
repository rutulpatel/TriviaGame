//https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple API for questions
$(function() {

    var questionId = "#question";
    var queContainerClass = ".question-container";
    var ansContainerClass = ".answer-container";
    var ranOutOfTime = false;
    var correctCount = 0;
    var incorrectCount = 0;
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
            answer: "England",
            answerDescription: "All Christmas activities, including dancing, seasonal plays, games, singing carols, cheerful celebration and especially drinking were banned by the Puritan-dominated Parliament of England in 1644, with the Puritans of New England following suit."
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
            answer: "Bathing",
            answerDescription: "In California, It is Illegal to Eat an Orange in Your Bathtub. This has to be the most bizarre law I read from California. It was made around 1920, when people believed that the citric acid in the orange would mix with the natural bath oils and would create a highly explosive mixture."
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
            answer: "Infinity",
            answerDescription: "Any number divided by 0 results in Inifinite number."
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
            answer: "1 in 5 billion",
            answerDescription: "Odds of being killed by space debris - 1 in 5 billion."
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
            answer: "Simpsons",
            answerDescription: "Simpsons is the longest-running American sitcom and the longest-running American animated program, and, in 2009, it surpassed Gunsmoke as the longest-running American scripted primetime television series."
        },
        6: {
            id: 6,
            question: "How many dimples are there on a regular golf ball?",
            choices: [
                "418",
                "377",
                "294",
                "336"
            ],
            answer: "336",
            answerDescription: "There are 336 dimples on a golf ball."
        },
        7: {
            id: 7,
            question: "Coulrophobia means fear of what?",
            choices: [
                "Jews",
                "Sacred Things",
                "Clowns",
                "Old People"
            ],
            answer: "Clowns",
            answerDescription: "Coulrophobia is fear of Clowns."
        },
        8: {
            id: 8,
            question: "Every year, over 8,800 people injure themselves with what apparently harmless, tiny object?",
            choices: [
                "Knife",
                "Pencil",
                "Baseball bat",
                "Toothpick"
            ],
            answer: "Toothpick",
            answerDescription: "8800 people injure themselves with a Toothpick."
        },
        9: {
            id: 9,
            question: "How many pounds of pressure do you need to rip off your ear?",
            choices: ["17",
                "7",
                "2",
                "11"
            ],
            answer: "7",
            answerDescription: "7 pounds pressure can rip off your ear."
        },
        10: {
            id: 10,
            question: "At what temperature are Fahrenheit and Celsius the same?",
            choices: ["-40",
                "50",
                "0",
                "92"
            ],
            answer: "-40",
            answerDescription: "At -40 degrees Fahrenheit and celebration are the same"
        }
    };

    var triviaHtmlComponents = {
        addQuestion: function(parentContainer, childText, childId, queNum) {
            var h2Component = $("<h2>").attr("id", childId).attr("que-num", queNum).text(childText);
            $(parentContainer).html(h2Component);
        },
        choiceClasses: "col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 ",
        addAnswers: function(parentContainer, childText, childId) {
            var aComponent = $("<a>").attr("class", triviaHtmlComponents.choiceClasses + " choice")
                .attr("id", childId)
                .attr("href", "#")
                .attr("data-bs-hover-animate", "pulse") 
                .attr("data-name", childText)
                .text(childText);
            var h3Component = $("<h3>").html(aComponent);
            var divComponent = $("<div>").attr("class", "row").html(h3Component);
            $(parentContainer).append(divComponent);
        },
        showAnswer: function(parentContainer, buttonId, buttonText, text, backgroundColor) {
            $(parentContainer).html("");
            var divComponent = $("<div>");
            divComponent.attr("class", "jumbotron text-success");
            divComponent.css("background", "#2980ef");
            divComponent.html(text);
            var aComponent = $("<a>").attr("class", triviaHtmlComponents.choiceClasses + " submit")
                .attr("id", buttonId)
                .attr("href", "#")
                .attr("data-bs-hover-animate", "pulse")
                .attr("data-name", buttonText) 
                .text(buttonText);
            var h3Component = $("<h3>").html(aComponent);
            var buttonDivComponent = $("<div>");
            buttonDivComponent.attr("class", "row").html(h3Component);
            $(parentContainer).append(divComponent);
            $(parentContainer).append(buttonDivComponent);
        }
    };

    var timerInterval, timerTimeout;
    var gameTimer = {
        maxSec: (15),
        time: 0,
        startTimer: function() {
            timerInterval = setInterval(gameTimer.countTimer, 1000);
            clearTimeout(timerTimeout);
            timerTimeout = setTimeout(triviaGame.checkAnswer, gameTimer.maxSec * 1000);
        },
        stopTimer: function() {
            console.log("stop");
            clearInterval(timerInterval);
            clearTimeout(timerTimeout);
        },
        resetTimer: function() {
            clearTimeout(timerTimeout);
            clearInterval(timerInterval);
            gameTimer.time = 0;
            gameTimer.updateHTML(gameTimer.maxSec);
        },
        countTimer: function() {
            gameTimer.time++;
            console.log(gameTimer.time);
            if ((gameTimer.maxSec - gameTimer.time) >= 0) {
                gameTimer.updateHTML(gameTimer.maxSec - gameTimer.time);
            }
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
            ranOutOfTime = false;
            triviaGame.ansClicked();

        },
        ansClicked: function() {
            $(".choice").on("click", function() {
                console.log($(this).text());
                gameTimer.stopTimer();
                triviaGame.checkAnswer($(this).text());
            });
        },
        submitClicked: function() {
            $("#submit").on("click", function() {
                console.log(parseInt($(questionId).attr("que-num")) + 1);
                console.log(Object.keys(data).length);
                //loads next question
                if ((parseInt($(questionId).attr("que-num")) + 1) >= ((Object.keys(data).length) + 1)) {
                    msg = "<h2>Game Over</h2><br>" +
                        "<h3>You answered " + correctCount + " correct & " + incorrectCount + " wrong answers</h3><br>";
                    triviaHtmlComponents.showAnswer(ansContainerClass, "restart", "Restart", msg);
                    triviaGame.submitClicked();
                } else {
                    triviaGame.loadData(data[(parseInt($(questionId).attr("que-num")) + 1)]);
                }
            });
            $("#restart").on("click", function() {
                triviaGame.startGame();
            });
        },
        checkAnswer: function(ansSelected) {
            var dataObj = data[$(questionId).attr("que-num")];
            var msg = "";

            if (gameTimer.time >= 15) {
                ranOutOfTime = true;
                console.log(gameTimer.time);
                gameTimer.resetTimer();
                msg += "<h2>You are out of time, here's the answer...</h2><br>";
            } else {
                if (ansSelected === dataObj.answer) {
                    msg += "<h2>You are right...</h2><br>";
                    ranOutOfTime = false;
                    correctCount++;
                } else {
                    msg += "<h2>Oh, you guessed it wrong :(</h2><br>";
                    ranOutOfTime = true;
                    incorrectCount++;
                }
            }
            msg += "<h3>" + dataObj.answerDescription + "</h3>";
            triviaHtmlComponents.showAnswer(ansContainerClass, "submit", "Okay", msg);
            triviaGame.submitClicked();
        },
        startGame: function() {

            this.loadData(data[1]);

        }
    };

    triviaGame.startGame();


    $("#dialog").dialog("button was pressed");
});
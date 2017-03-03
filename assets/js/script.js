//https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple API for questions
$(function() {

    var choice1Id = "#choice1";
    var choice2Id = "#choice2";
    var choice3Id = "#choice3";
    var choice4Id = "#choice4";
    var questionId = "#question";
    var queContainerClass = ".question-container";
    var ansContainerClass = ".answer-container";
    var data = {
        1: {
            question: "In what place was Christmas once illegal?",
            choices: [
                "England",
                "France",
                "Brazil",
                "Russia"
            ],
            correctAnswer: "England"
        },
        2: {
            question: "In California, it is illegal to eat oranges while doing what?",
            choices: [
                "Bathing",
                "Driving",
                "Gardening",
                "Working on a computer"
            ],
            correctAnswer: "Bathing"
        },
        3: {
            question: "What is 1,000,000 divided by 0?",
            choices: [
                "0",
                "1",
                "Infinity",
                "1,000,000"
            ],
            correctAnswer: "Infinity"
        },
        4: {
            question: "What are the odds of being killed by space debris?",
            choices: [
                "1 in 1 trillion",
                "1 in 5 million",
                "1 in 5 billion",
                "1 in 10 billion"
            ],
            correctAnswer: "1 in 5 billion"
        },
        5: {
            question: "Which of the following is the longest running American animated TV show?",
            choices: [
                "TV Funhouse",
                "Rugrats",
                "Simpsons",
                "Pokemon"
            ],
            correctAnswer: "Simpsons"
        }

    }

    var triviaHtmlComponents = {
        addQuestion: function(parentContainer, childText, childId) {
            var h2Component = $("<h2>").attr("id", childId).text(childText);
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

    var timerInterval;
    var gameTimer = {
        time: 0,
        startTimer: function() {
            timerInterval = setInterval(gameTimer.countTimer, 1000);
        },
        stopTimer: function() {
            clearInterval(timerInterval);
        },
        resetTimer: function() {
            gameTimer.time = 0;
        },
        countTimer: function() {
            gameTimer.time++;
            console.log(gameTimer.time);
            $("#timeRem").text(gameTimer.time);
        }
    }

    var triviaGame = {
        questionNumber: 0,
        loadData: function(dataObj) {
            $(questionId).text(dataObj.question);
            triviaHtmlComponents.addQuestion(queContainerClass, dataObj.question, "question");
            for (var i = 0; i < dataObj.choices.length; i++) {
                console.log(dataObj.choices[i]);
                triviaHtmlComponents.addAnswers(ansContainerClass, dataObj.choices[i], "choice" + (i + 1));
                //$("#choice" + i).text(dataObj.choices[i]);
            }
        },
        checkAnswer: function() {
            $(".choice").on("click", function() {
                console.log($(this).text());
            });
        }
    };

    gameTimer.startTimer();
    triviaGame.loadData(data["1"]);
    //htmlComponents.addAnswers(".answer-container", "choice", "choice5");

});
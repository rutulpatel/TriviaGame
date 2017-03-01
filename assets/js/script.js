//https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple API for questions
$(function() {

    var choice1Id = "#choice1";
    var choice2Id = "#choice2";
    var choice3Id = "#choice3";
    var choice4Id = "#choice4";
    var questionId = "#question";
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

    var triviaGame = {
        questionNumber: 0,
        loadData: function(dataObj) {
            $(questionId).text(dataObj.question);
            for (var i = 1; i <= 4; i++) {
                console.log(dataObj.choices[i - 1]);
                $("#choice" + i).text(dataObj.choices[i - 1]);
            }
        },
        checkAnswer: function() {
            $(".choice").on("click", function() {
                console.log($(this).text());
            });
        }

    };

    triviaGame.loadData(data["1"]);
    triviaGame.checkAnswer();
});
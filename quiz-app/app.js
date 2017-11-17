// question collection
var allQuestions = [];
// current question index
var count = 0;
// question score
var score = 0;

function question(desc, choices, correctAnswer) {
    this.desc = desc;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
}

var questionOne = new question("These stories were made------his own head.", ["out of", "up of", "into", "up out of"], 3);
var questionTwo = new question("Which is -------country , Canada or Australia?", ["large", "larger", "a larger", "the larger"], 3);
var questionThree = new question("Jenny liked Fred-------all the boys he was the most honest one.", ["because", "because of", "as", "for that"], 1);

allQuestions.push(questionOne);
allQuestions.push(questionTwo);
allQuestions.push(questionThree);

function prepare() {
    var nextButton = document.getElementById("answer_next");
    nextButton.onclick = function () {
        if (!checkRadioButton("choice")) {
            alert("Please choose one option!");
            return false;
        }
        judgeAnswer();
        showQuestion();
    };

    var startButton = document.getElementById("quiz_start");
    startButton.onclick = function () {
        startButton.style.display = "none";
        nextButton.style.display = "";
        document.getElementById("question_num").style.display = "";
        // show total question number
        var totalNumTextNode = document.createTextNode(allQuestions.length + "");
        document.getElementById("total_num").appendChild(totalNumTextNode);
        showQuestion();
    };
}

function judgeAnswer() {
    var answer = document.querySelector('input[name="choice"]:checked').value;
    if (parseInt(answer) === allQuestions[count - 1].correctAnswer) {
        score++;
    }
}

function showQuestion() {
    var descElement = document.getElementById("desc");
    // clear previous question description
    removeAllChildren(descElement);
    var choicesElement = document.getElementById("choices");
    // clear previous choices
    removeAllChildren(choicesElement);

    if (count < allQuestions.length) {
        // show current question number
        document.getElementById("cur_num").innerText = (count + 1) + "";

        var currentQuestion = allQuestions[count++];

        // add question description
        var descText = document.createTextNode(currentQuestion.desc);
        descElement.appendChild(descText);

        // add question choices
        for (var i = 0; i < currentQuestion.choices.length; i++) {
            var li = document.createElement("li");
            var input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("value", i + "");
            input.setAttribute("name", "choice");
            var choiceText = document.createTextNode(currentQuestion.choices[i]);
            li.appendChild(input);
            li.appendChild(choiceText);
            choicesElement.appendChild(li);
        }
    } else {
        // hide question number
        document.getElementById("question_num").style.display = "none";
        // show score
        var scoreText = "Your final score is " + score + " points!";
        var scoreTextNode = document.createTextNode(scoreText);
        descElement.appendChild(scoreTextNode);
        document.getElementById("answer_next").style.display = "none";
    }
}

function removeAllChildren(whichElement) {
    while (whichElement.hasChildNodes()) {
        whichElement.removeChild(whichElement.firstChild);
    }
}

function addLoadEvent(func) {
    var oldfunc = window.onload;
    if (typeof oldfunc !== "function") {
        window.onload = func;
    } else {
        oldfunc();
        func();
    }
}

function checkRadioButton(radiosName) {
    var radios = document.getElementsByName(radiosName);
    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) {
            return true;
        }
    }
    return false;
}

addLoadEvent(prepare);
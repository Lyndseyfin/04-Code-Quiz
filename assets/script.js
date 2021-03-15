//defined variables
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var timeEl = document.querySelector(".timer");
var infoBox = document.getElementById("info")
var textCorrect = document.querySelector("#correctWrong");

//let variables as they change
let shuffledQuestions, currentQuestionIndex
var secondsLeft = 60;



// allows buttons to work 
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    textCorrect.classList.add('hide');
    SetNextQuestion() //incrementing to next question 
})


function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5) //sorting questions
    currentQuestionIndex = 0 //starting on first question

    questionContainerElement.classList.remove('hide')
    infoBox.classList.add('hide')
    setTime();
    SetNextQuestion()

}

function SetNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}


function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => { // generating answers
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}

function resetState() {
    nextButton.classList.add('hide') // hides the 'next' button after answer is seleced 
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
    }
}

function quizEnd() {
    document.querySelector("form").style.display = "block"
    document.querySelector("#submitBtn").addEventListener("click", function () {
        var saveUser = {
            initials: document.querySelector("#initials").value,
            score: timeEl.textContent
        }

        console.log(saveUser)
        window.localStorage.setItem("highScores", JSON.stringify(saveUser))
        JSON.parse(window.localStorage.getItem("highScores"))
    })
}

function selectAnswer(e) {
    var selectedButton = e.target

    var correct = selectedButton.dataset.correct //checking if correct
    setStatusClass(document.body, correct) // looping through to check if correct or incorrect 
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (correct) {
        textCorrect.textContent = "You got it right!";
    }
    else {
        textCorrect.textContent = "You got it wrong!";
        secondsLeft = secondsLeft - 10;
        timeEl.textContent = secondsLeft + " seconds left ";
    }

    textCorrect.classList.remove('hide');

    //checks end condition no questions left
    if (shuffledQuestions.length > currentQuestionIndex + 1) { // more questions?
        nextButton.classList.remove('hide') //remooving the hidden 'next' button 
    } else {
        quizEnd()
        secondsLeft = 0
        startButton.textContent = 'Restart' //start from beginning
        questionContainerElement.classList.add('hide')
        startButton.classList.remove('hide')
    }
}

document.getElementById("submitBtn").addEventListener("click", function (event) {
    event.preventDefault() //we don't want the page to refresh upon form submission!
})


function setStatusClass(element, correct) {
    clearStatusClass(element) // clear if already defined 
    if (correct) { // adding the correct class is correct 
        element.classList.add('correct')

    } else {
        element.classList.add('wrong')
    }

    element.disabled = true;

}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function setTime() {
    timerInterval = setInterval(function () {
        //checks end condition no time left
        //local storage should be an array of objects with it called scores = [{initial: initial, score: score}]
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            startButton.textContent = 'Restart' //start from beginning
            questionContainerElement.classList.add('hide')
            startButton.classList.remove('hide')
        }

        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left ";
        
    }, 1000);
}

var questions = [
    {
        question: 'Inside which HTML element do you put javascript in?',
        answers: [
            { text: '<var>', correct: false },
            { text: '<script>', correct: true },
            { text: '<section>', correct: false },
            { text: '<code>', correct: false },
        ]
    },

    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Cascading Style Sheet', correct: true },
            { text: 'Controller Style Sheet', correct: false },
            { text: 'Cascading Screen Style', correct: false },
            { text: 'Controller Screen Style', correct: false },
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Processor', correct: false },
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'Hyper Text Multiple Language', correct: false },
            { text: 'Hyper Tool Multi Language', correct: false },
        ]
    },
    {
        question: 'Arrays in Javascript can be used to store ___.',
        answers: [
            { text: 'Numbers and strings', correct: false },
            { text: 'Other arrays', correct: false },
            { text: 'Booleans', correct: false },
            { text: 'All of the above', correct: true },
        ]
    },
    {
        question: 'Commonly used data types do NOT include ___.',
        answers: [
            { text: 'Booleans', correct: false },
            { text: 'Alerts', correct: true },
            { text: 'Numbers', correct: false },
            { text: 'Strings', correct: false },
        ]
    },
]
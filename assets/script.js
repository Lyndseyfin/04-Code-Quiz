//defined variables
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

//var mintues = Math.floor(time / 1000 / 60);
//console.log(minutes); 

let shuffledQuestions, currentQuestionIndex

// allows buttons to work 
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    SetNextQuestion() //incrementing to next question 
})
 

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5) //sorting questions
    currentQuestionIndex = 0 //starting on first question
    questionContainerElement.classList.remove('hide')
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

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct //checking if correct
    setStatusClass(document.body, correct) // looping through to check if correct or incorrect 
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) { // more questions?
     nextButton.classList.remove('hide') //remooving the hidden 'next' button 
    } else {
        startButton.innerText = 'Restart' //start from beginning 
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element) // clear if already defined 
    if (correct) { // adding the correct class is correct 
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')  
    }
}

function clearStatusClass(element) { 
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

var questions = [
    {
        question: 'Which element do you put javascript in?',
        answers: [
            {text: '<var>', correct: false},
            {text: '<script>', correct: true },
            {text: '<section>', correct: false },
            {text: '<code>', correct: false },
        ]
    },
    
    {
        question: 'What does CSS stand for?',
        answers: [
            {text: 'Cascading Style Sheet', correct: true },
            {text: 'Controller Style Sheet', correct: false },
            {text: 'Cascading Screen Style', correct: false },
            {text: 'Controller Screen Style', correct: false },
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            {text: 'Hyper Text Processor', correct: false },
            {text: 'Hyper Text Markup Language', correct: true },
            {text: 'Hyper Text Multiple Language', correct: false },
            {text: 'Hyper Tool Multi Language', correct: false },
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            {text: 'Cascading Style Sheet', correct: true },
            {text: 'Controller Style Sheet', correct: false },
            {text: 'Cascading Screen Style', correct: false },
            {text: 'Controller Screen Style', correct: false },
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            {text: 'Cascading Style Sheet', correct: true },
            {text: 'Controller Style Sheet', correct: false },
            {text: 'Cascading Screen Style', correct: false },
            {text: 'Controller Screen Style', correct: false },
        ]
    },
]
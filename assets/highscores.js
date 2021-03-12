//get items from local storage and show them in highscores page
//loop through array of scores
var highScoresList = document.querySelector('#highScoresList')
var highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML =
highScores.map(score => {
    return <li class="high-score">${score.name} - $(score.score)</li>
}).join('')

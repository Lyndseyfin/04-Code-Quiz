//get items from local storage and show them in highscores page
//loop through array of scores
var username = document.querySelector('#username');
var saveScoreBtn = document.querySelector('#saveScoreBtn');
var finalScore = document.querySelector('#finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore');

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = e => {
    e.preventDefult();

    var score = {
        score: mostRecentScore,
        name: username.value,
    };

    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');

};






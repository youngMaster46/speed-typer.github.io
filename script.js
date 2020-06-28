const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

// List of words for game
let words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eigth',
    'feeble',
    'admit',
    'drag',
    'loving'
]
getWords(20)
// Init word
let randowWord;

// Init score
let score = 0;

// Init time 
let time = 10;

// Set difficulty from local storage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'

// Set difficulty select value
difficultySelect.value = difficulty

// Focus on text on start
text.focus()

// Start counting down
const timeInterval = setInterval(updateTime, 1000)

// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM 
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord
}

addWordToDOM()

// Fetch random words
async function getWords(number) {
    let response = await fetch(`https://random-word-api.herokuapp.com/word?number=${number}`)
        .catch(function (err) {
            console.log('Fetch Error', err);
        })

    let data = await response.json()
    words = data
}

// Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
    time--
    timeEl.innerHTML = time + 's'

    if (time === 0) {
        clearInterval(timeInterval)
        // End game
        gameOver();
    }
}

// Game over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick='location.reload()'>Reload</button>
    `
    // Show block
    endgameEl.style.display = 'flex'
}

// Event listeners

// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        addWordToDOM()
        updateScore()

        // Clear
        e.target.value = ''

        // After intered word
        if (difficulty === 'hard') {
            time += 2
        } else if (difficulty === 'medium') {
            time += 3
        } else {
            time += 5
        }
        updateTime()
    }
})

// Settings btn click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide')
})

// Setting select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})
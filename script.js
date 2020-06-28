const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game')
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

// Focus on text on start
text.focus()

// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * (words.length + 1))];
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

// Event listeners

text.addEventListener('input', e => {
    const insertedText = e.target.value

    if (insertedText === randomWord) {
        addWordToDOM()
        updateScore()

        // Clear
        e.target.value = ''
    }
})
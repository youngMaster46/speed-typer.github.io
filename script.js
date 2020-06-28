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

// Init word
let randowWord;

// Init score
let score = 0;

// Init time 
let time = 10;

// Generate random word from array
function getRandowWord() {
    return words[Math.floor(Math.random() * (words.length + 1))];
}

// Fetch random words
async function getWords(number) {
    let response = await fetch(`https://random-word-api.herokuapp.com/word?number=${number}`)
    .catch(function(err) {
        console.log('Fetch Error', err);
    })

    let data = await response.json()
    words = data
}
getWords(20)

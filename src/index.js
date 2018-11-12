import Hangman from './hangman.js'
import { getPuzzle } from './requests.js'

//*******************************************************
// vars
//*******************************************************

let game1
const puzzleEl = document.querySelector('#output')
const guessesEl = document.querySelector('#remainingGuesses')
const resetButton = document. querySelector('#reset')
const usedLetters = document.querySelector('#shelf')
const container = document.querySelector('body')

//*******************************************************
// interaction
//*******************************************************

window.addEventListener('keypress', (e) => {
   if (game1.status !== 'failed') {
      const guess = e.key.toLowerCase()
      game1.makeGuess(guess)
      render()
      console.log(game1)
   }
})


//*******************************************************
// functions
//*******************************************************

const startGame = async () => {
   const puzzle = await getPuzzle(2)
   game1 = new Hangman(puzzle, 5)
   render()
}

const render = () => {
   puzzleEl.innerHTML = ''
   guessesEl.innerHTML = game1.statusMessage
   
   game1.puzzle.split('').forEach((letter) => {
      const letterEl = document.createElement('span')
      letterEl.classList.add('letter')
      letterEl.textContent = letter
      puzzleEl.appendChild(letterEl)
   })
   
   // show used letters
   usedLetters.textContent = game1.guessedLetters

   //interaction marker
   container.setAttribute('class', '')
   container.setAttribute('class', game1.action)

   // remove the marker only if playing else leave fail or success
   if (game1.status == 'playing') {
      setTimeout(() => {
         container.setAttribute('class', '')
      }, 500);
   }
}


//*******************************************************
// start game
//*******************************************************

startGame()
resetButton.addEventListener('click', startGame)

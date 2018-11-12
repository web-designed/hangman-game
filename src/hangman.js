class Hangman {
   constructor(word, remainingGuesses){
      this.word = word.toLowerCase().split('')
      this.remainingGuesses = remainingGuesses
      this.guessedLetters = []
      this.status = 'playing'
      this.action = ''
   }
   get puzzle(){
      let puzzle = ''
      this.word.forEach((letter) => {
         if( this.guessedLetters.includes(letter) || letter === ' '){
            puzzle += letter
         } else {
            puzzle += '*'
         }
      })
      return puzzle
   }
   makeGuess(guess){
      guess = guess.toLowerCase()
      const isUnique = !this.guessedLetters.includes(guess)
      const isBadGuess = !this.word.includes(guess)
      const isRepeatedLetter = this.guessedLetters.includes(guess)

      if(this.status !== 'playing') {
         return false
      }

      if (isUnique) {
         this.guessedLetters.push(guess)
         this.action = 'success'
      }

      if (isUnique && isBadGuess) {
         this.remainingGuesses--
         this.action = 'fail'
      }

      if(isRepeatedLetter){
         this.action = 'warn'
      }

      this.calculateStatus()
   }
   calculateStatus(){
      const isInGuessedLetters = (letter) => this.guessedLetters.includes(letter) || letter === ' '
      const isFinished = this.word.every(isInGuessedLetters)
      const isFailed = this.remainingGuesses < 1

      if (isFailed) {
         this.status = 'failed'
      } else if (isFinished){
         this.status = 'finished'
      } else {
         this.status = 'playing'
      }
   }
   get statusMessage(){
      let statusMessage = `Remaining Guesses: <span class="guess">${this.remainingGuesses}</span>`

      if (this.status === 'failed') {
         statusMessage = `Nice Try! The word was ${this.word.join('')}`
      }

      if (this.status === 'finished') {
         statusMessage = 'Great Work! You guessed the puzzle'
      }

      return statusMessage
   }
}

export { Hangman as default }
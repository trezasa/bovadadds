document.addEventListener('DOMContentLoaded', () => {
  const words = ['APPLE', 'TABLE', 'HAPPY', 'SUNNY', 'OCEAN', 'PUPPY', 'SMILE', 'EARTH', 'WATER', 'LIGHT'];
  let currentWord = '';
  let score = 0;

  const scoreEl = document.getElementById('ws-score');
  const scrambledWordEl = document.getElementById('ws-scrambled-word');
  const guessInputEl = document.getElementById('ws-guess-input');
  const feedbackEl = document.getElementById('ws-feedback');

  function scrambleWord(word) {
    let scrambled = word.split('').sort(() => 0.5 - Math.random()).join('');
    // Ensure the word is actually scrambled
    if (scrambled === word) {
      return scrambleWord(word);
    }
    return scrambled;
  }

  function newWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    scrambledWordEl.textContent = scrambleWord(currentWord);
    guessInputEl.value = '';
    guessInputEl.focus();
  }

  function updateScore(points) {
    score += points;
    scoreEl.textContent = `Score: ${score}`;
  }

  function checkGuess() {
    const guess = guessInputEl.value.toUpperCase();
    if (guess === currentWord) {
      feedbackEl.textContent = 'Correct!';
      feedbackEl.style.color = 'var(--a)';
      updateScore(10);
      setTimeout(() => {
        feedbackEl.textContent = '';
        newWord();
      }, 1000);
    } else {
      feedbackEl.textContent = 'Try again!';
      feedbackEl.style.color = '#FF6F00'; // Orange from your color scheme
      guessInputEl.value = '';
    }
  }

  guessInputEl.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      checkGuess();
    }
  });

  // Initialize game
  newWord();
});
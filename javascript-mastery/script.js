// javascript-mastery/project1-number-guessing-game/script.js

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const resetBtn = document.getElementById('reset-btn');

guessBtn.addEventListener('click', () => {
  const guess = Number(guessInput.value);

  if (!guess || guess < 1 || guess > 100) {
    feedback.textContent = '⛔ Please enter a number between 1 and 100';
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (guess === randomNumber) {
    feedback.textContent = `✅ Correct! The number was ${randomNumber}`;
    feedback.style.color = 'green';
  } else if (guess > randomNumber) {
    feedback.textContent = '📉 Too high!';
    feedback.style.color = 'red';
  } else {
    feedback.textContent = '📈 Too low!';
    feedback.style.color = 'red';
  }
});

resetBtn.addEventListener('click', () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  attemptsDisplay.textContent = attempts;
  feedback.textContent = '';
  guessInput.value = '';
});

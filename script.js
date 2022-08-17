'use strict';

/*======================
  Selecting Elements
======================*/
// Players
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Scores
const totalScore0 = document.querySelector('#score--0');
const totalScore1 = document.querySelector('#score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

// Dice image
const diceImg = document.querySelector('.dice');

// Game Control Buttons
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

/*======================
  Game initial state
======================*/
let currentScore, scores, gameover, activePlayer;
let init = function () {
  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  // For both players always starts with 0
  currentScore = 0;
  scores = [0, 0];
  gameover = false;
  activePlayer = 0;

  if (!diceImg.classList.contains('hidden')) {
    diceImg.classList.add('hidden');
  }

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
/*======================
  Switching Players
======================*/
const switchPlayer = function () {
  // restart the player's current store to become 0
  document.querySelector(`#current--${activePlayer}`).textContent = 0;

  // restart current score to initial state
  currentScore = 0;

  // switch active player
  activePlayer = activePlayer === 0 ? 1 : 0;

  // switch active player visually
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

/*======================
  Rolling the Dice
======================*/
rollDiceBtn.addEventListener('click', function () {
  if (!gameover) {
    // 1. generate random dice roll
    const randomDiceNumber = Math.trunc(Math.random() * 6) + 1;

    // 2. display the image with the roll number
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${randomDiceNumber}.png`;

    // 3. add dice roll to the current score if it's not 1
    if (randomDiceNumber != 1) {
      currentScore += randomDiceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

/*======================
      Hold Scores
======================*/
holdBtn.addEventListener('click', function () {
  if (!gameover) {
    // 1. add current score to the total score of the player
    scores[activePlayer] += currentScore;

    // 2. show the total score of the player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 3. check if player has won
    if (scores[activePlayer] >= 100) {
      // switch to gameover state
      gameover = true;
      // hide the dice
      diceImg.classList.add('hidden');

      // Add winner styles to the current player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // 4. switch players
      switchPlayer();
    }
  }
});

/*======================
      Restart Game
======================*/
newGameBtn.addEventListener('click', init);

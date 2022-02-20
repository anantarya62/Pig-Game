'use strict';

let total0 = document.querySelector('#score--0');
let total1 = document.getElementById('score--1');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const currPlayerOne = document.querySelector('#current--0');
const currPlayerTwo = document.querySelector('#current--1');
const dice = document.querySelector('.dice');

let playing, currentScore, activePlayer, scores;
//Starting Condition
const inIt = function () {
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  total0.textContent = 0;
  total1.textContent = 0;
  currPlayerOne.textContent = 0;
  currPlayerTwo.textContent = 0;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  dice.classList.add('hidden');
};

inIt();

//Switch player function
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  //Switch to next player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating a random dice roll
    let number = Math.floor(Math.random() * 6) + 1;
    //Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${number}.png`;
    //Check for dice rolled 1
    if (number != 1) {
      //Add dice to current score
      currentScore += number;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 30) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
    }
    switchPlayer();
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    console.log(total0);
    dice.classList.add('hidden');
  }
});

//New game
btnNew.addEventListener('click', inIt);

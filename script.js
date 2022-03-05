"use strict";

//Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1 ");

const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//Starting conditions
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

// const toggle = function () {
//   activePlayer = activePlayer === 0 ? 1 : 0;
//   player0El.classList.toggle("player--active");
//   player1El.classList.toggle("player--active");
// };

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  // toggle();
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1) Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2) Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3) Check for rolled 1: Switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1) Add current score to active players score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2) Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //2.1) If true, finish game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //2.2) Switch to next player
      switchPlayer();
    }
  }
});

//Executing the New Game button functionality
btnNew.addEventListener("click", init);
// document.querySelector(".btn--new").addEventListener("click", function () {
//   currentScore = 0;

//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   // toggle();
//   player0El.classList.remove("player--winner");
//   player1El.classList.remove("player--winner");
//   player0El.classList.add("player--active");
//   player1El.classList.remove("player--active");

// diceEl.classList.add("hidden");
// document
//   .querySelector(`.player--${activePlayer}`)
//   .classList.remove("player--winner");
// document
//   .querySelector(`.player--${activePlayer}`)
//   .classList.add("player--active");
// playing = true;

'use strict';
// selecionar os elementos
const backgPlayer0 = document.querySelector('.player--0');
const backgPlayer1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const hold = document.querySelector('.btn--hold');
let scores = [0, 0];

let activePlayer = 0;
let currentScore = 0;
let playing = true;

//zerar jogo com o new game;
const zero = function () {
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  backgPlayer0.classList.add('player--active');
  backgPlayer1.classList.remove('player--active');
  scores = [0, 0];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
};
zero();

//zerando os pontos com o butão new game
const newGame = document
  .querySelector('.btn--new')
  .addEventListener('click', zero);

//Trocando de player
const switchingPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  backgPlayer0.classList.toggle('player--active');
  backgPlayer1.classList.toggle('player--active');
};

//rolando os dados
const randomNumber = function () {
  if (playing) {
    const diceRandom = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceRandom}.png`;

    if (diceRandom !== 1) {
      currentScore += diceRandom;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchingPlayer();
    }
  }
};

rollDice.addEventListener('click', randomNumber);

//HOLD
/*
Toda vez que o hold for clicado, o current score sobe para o score score 
acumulado do jogador da vez. O player é trocado imediatamente, para que o current score acumule
os pontos no current score do outro participante.
*/

hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    scores.push(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    //VERIFICAR SE CHEGOU A 100 PTS
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
    } else {
      switchingPlayer();
    }
  }
});

console.log('JavaScript code loaded');
// keeping this until i don't have problems anymore

//append generated cards
const gridContainer = document.getElementById('grid-container');

//representing the restart button
const restartButton = document.querySelector('.restart-button');

const timerValue = document.getElementById("time");

//initializing emty arrays/variables
let openedCards = [];
let score = 0;

//initializing time variables
let seconds = 0;
let minutes = 0;
let timerStarted = false;
let timerInterval;

//invoke restart game function when button is clicked
restartButton.addEventListener('click', restartGame);

//path to pngs/symbols
const symbols = [
  'symbols/Symbol-1.png',
  'symbols/Symbol-2.png',
  'symbols/Symbol-3.png',
  'symbols/Symbol-4.png',
  'symbols/Symbol-5.png',
  'symbols/Symbol-6.png',
  'symbols/Symbol-7.png',
  'symbols/Symbol-8.png',
  'symbols/Symbol-9.png',
  'symbols/Symbol-10.png',
  'symbols/Symbol-11.png',
  'symbols/Symbol-12.png',
  'symbols/Symbol-13.png',
  'symbols/Symbol-14.png',
  'symbols/Symbol-15.png',
  'symbols/Symbol-16.png',
  'symbols/Symbol-17.png',
  'symbols/Symbol-18.png',
  'symbols/Symbol-19.png',
  'symbols/Symbol-20.png'
];

//creates array & pairs
const cards = symbols.concat(symbols);

//shuffle cards array randomly
shuffle(cards);

//creates card element for each symbol
for (let i = 0; i < cards.length; i++) {
  const card = createCard(cards[i]);
  gridContainer.appendChild(card);
}

//creates card element with front and backside
//symbol applies on backside of card
function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');

  const frontSide = document.createElement('div');
  frontSide.classList.add('front-side');
  card.appendChild(frontSide);

  const backSide = document.createElement('div');
  backSide.classList.add('back-side');
  card.appendChild(backSide);

  card.addEventListener('click', function () {
    if (!card.classList.contains('card-flipped') && !card.classList.contains('face-up') && openedCards.length < 2) {
      if (!timerStarted) {
        timerStarted = true;
        timerInterval = setInterval(timeGenerator, 1000);
      }
      card.classList.add('card-flipped');
      openedCards.push(card);
      if (openedCards.length === 2) {
        checkMatchingCards();
      }
    } else if (card.classList.contains('card-flipped') && !card.classList.contains('face-up')) {
      // Do nothing if the card is already flipped and not face-up (matched)
      return;
    } else {
      card.classList.remove('card-flipped');
      openedCards.splice(openedCards.indexOf(card), 1);
    }
  });

  card.setAttribute('data-symbol', symbol);

  return card;
}

/* check if the symbols match, score increases by two
if score = total numbers of cards, game restarts
*/
function checkMatchingCards() {
  const card1 = openedCards[0];
  const card2 = openedCards[1];
  const symbol1 = card1.querySelector('.back-side').style.backgroundImage;
  const symbol2 = card2.querySelector('.back-side').style.backgroundImage;

  if (symbol1 === symbol2) {
    score += 2;
    updateScore(score);

    openedCards = [];

    // Overlay after winning a game
    if (score === cards.length) {
      clearInterval(timerInterval);
      showOverlayWithDelay();
    }
  } else {

      openedCards = [];
    } 800;
  }

function showOverlayWithDelay() {
  setTimeout(function () {
    document.getElementById('overlay-score').textContent = 'Score: ' + score;
    document.getElementById('overlay-time').textContent = timerValue.textContent;
    showOverlay();
  }, 450);
}

//updates text content of element id "score"
function updateScore(score) {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = 'Score: ' + score;
}



//making the timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timerValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;
};


//resets game, shuffles cards, sets score to 0
function restartGame() {
  openedCards = [];
  score = 0;
  updateScore(score);

  const gridItems = document.querySelectorAll('.card');
  gridItems.forEach(function (item) {
    item.remove();
  });

  //clear timer interval
  clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  timerStarted = false;
  timerValue.innerHTML = "<span>Time:</span> 00:00";

  //shuffle
  shuffle(cards);

  for (let i = 0; i < cards.length; i++) {
    const card = createCard(cards[i]);
    gridContainer.appendChild(card);
  }

  //hide overlay when restarting the game
  hideOverlay();
}


//shuffles elements
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//overlay
const overlayContainer = document.getElementById("overlay-container");
const overlayRestartButton = document.getElementById("overlay-restart");

// Add event listener to restart button in overlay
overlayRestartButton.addEventListener("click", restartGame);

// Show overlay function
function showOverlay() {
  overlayContainer.style.display = "flex";
}

// Hide overlay function
function hideOverlay() {
  overlayContainer.style.display = "none";
}

// Show overlay if score equals total number of cards
if (score === cards.length) {
  showOverlay();
}
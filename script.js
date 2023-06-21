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
  { name: "pic1", image: 'symbols/Symbol-1.png'},
  { name: "pic2", image: 'symbols/Symbol-2.png'},
  { name: "pic3", image: 'symbols/Symbol-3.png'},
  { name: "pic4", image: 'symbols/Symbol-4.png'},
  { name: "pic5", image: 'symbols/Symbol-5.png'},
  { name: "pic6", image: 'symbols/Symbol-6.png'},
  { name: "pic7", image: 'symbols/Symbol-7.png'},
  { name: "pic8", image: 'symbols/Symbol-8.png'},
  { name: "pic9", image: 'symbols/Symbol-9.png'},
  { name: "pic10", image: 'symbols/Symbol-10.png'},
  { name: "pic11", image: 'symbols/Symbol-11.png'},
  { name: "pic12", image: 'symbols/Symbol-12.png'},
  { name: "pic13", image: 'symbols/Symbol-13.png'},
  { name: "pic14", image: 'symbols/Symbol-14.png'},
  { name: "pic15", image: 'symbols/Symbol-15.png'},
  { name: "pic16", image: 'symbols/Symbol-16.png'},
  { name: "pic17", image: 'symbols/Symbol-17.png'},
  { name: "pic18", image: 'symbols/Symbol-18.png'},
  { name: "pic19", image: 'symbols/Symbol-19.png'},
  { name: "pic20", image: 'symbols/Symbol-20.png'}
];

// Pick random objects from the items array
const generateRandom = () => {
  // temporary array
  let tempArray = [...symbols];
  // initializes cardValues array
  let cardValues = [];
  // Random object selection
  for (let i = 0; i < 40; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    // once selected, remove the object from the temporary array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues) => {
  gridContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  // simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 40; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    const card = createCard(cardValues[i]);
    gridContainer.appendChild(card);
  }
};

//creates array & pairs
const cards = symbols.concat(symbols);

//shuffle cards array randomly
//shuffle(cards);

//creates card element for each symbol
for (let i = 0; i < cards.length; i++) {
  const card = createCard(cards[i]);
  gridContainer.appendChild(card);
}

//creates card element with front and backside
//symbol applies on backside of card
function createCard(symbol) {
  console.log("create card");
  const card = document.createElement('div');
  card.classList.add('card');

  const frontSide = document.createElement('div');
  frontSide.classList.add('front-side');
  card.appendChild(frontSide);

  const backSide = document.createElement('div');
  backSide.classList.add('back-side');
  card.appendChild(backSide);

  //triggers when a card is clicked
  card.addEventListener('click', function () {
    if (!card.classList.contains('flipped') && !card.classList.contains('face-up') && openedCards.length < 2) {
      console.log("click");
      if (!timerStarted) {
        timerStarted = true;
        timerInterval = setInterval(timeGenerator, 1000);
      }

      card.classList.add('flipped');
      const imgElement = card.querySelector('.back-side');
      const cardName = card.getAttribute('data-name');
      console.log(cardName);
      imgElement.style.backgroundImage = `url(${cardName})`;

      openedCards.push(card);
      if (openedCards.length === 2) {
        setTimeout(checkMatchingCards, 500);
      }
    } else if (card.classList.contains('flipped') && !card.classList.contains('face-up')) {
      //do nothing if the card is already flipped and not face-up (matched)
      return;
    } else {
      card.classList.remove('flipped');
      openedCards.splice(openedCards.indexOf(card), 1);
    }
  });

  card.setAttribute('data-name', symbol.image);

  return card;
}

//check if the symbols match, score increases by two
//if score = total numbers of cards, game restarts
function checkMatchingCards() {
  const card1 = openedCards[0];
  const card2 = openedCards[1];
  const symbol1 = card1.getAttribute('data-name');
  const symbol2 = card2.getAttribute('data-name');

  if (symbol1 === symbol2) {
    //adds points for matching cards
    score += 2;
    updateScore(score);

    openedCards = [];

    //if both card match, add "matched" class
    card1.classList.add("matched");
    card2.classList.add("matched");

    //hide the matched cards after a delay of 0.3 sec
    setTimeout(() => {
      card1.style.opacity = '0';
      card2.style.opacity = '0';
    }, 300);

    // adds overlay if score is 40 (same as card length)
    if (score === cards.length) {
      clearInterval(timerInterval);
      showOverlayWithDelay();
    }
  } else {
    //flips back cards if they're not matching
    //removes background image
    //with delay of 0.6 sec
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      const imgElement1 = card1.querySelector('.back-side');
      const imgElement2 = card2.querySelector('.back-side');
      imgElement1.style.backgroundImage = '';
      imgElement2.style.backgroundImage = '';

      openedCards = [];
    }, 800);
  }
}


//overlay with 0.45 sec delay function
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

  // const gridItems = document.querySelectorAll('.card');
  // gridItems.forEach(function (item) {
  //   item.remove();
  // });

  //clear timer interval
  clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  timerStarted = false;
  timerValue.innerHTML = "<span>Time:</span> 00:00";

  //generate random card values and create the matrix
  const cardValues = generateRandom();
  matrixGenerator(cardValues);

  //hide overlay when restarting the game
  hideOverlay();
}


//shuffles elements
// function shuffle(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

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
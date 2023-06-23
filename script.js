//append generated cards
const gridContainer = document.getElementById('grid-container');

//representing the restart button
const restartButton = document.querySelector('.restart-button');

//gets the time id from the html doc
const timerValue = document.getElementById("time");

//initializing emty arrays/variables
let openedCards = [];
let score = 0;

//initializing time variables
let seconds = 0;
let minutes = 0;
let timerStarted = false;
let timerInterval;

//call restart game function when button is clicked
restartButton.addEventListener('click', restartGame);

//path to pngs/symbols
const symbols = [
  { name: "pic1", image: 'symbols/Symbol-1.png' },
  { name: "pic2", image: 'symbols/Symbol-2.png' },
  { name: "pic3", image: 'symbols/Symbol-3.png' },
  { name: "pic4", image: 'symbols/Symbol-4.png' },
  { name: "pic5", image: 'symbols/Symbol-5.png' },
  { name: "pic6", image: 'symbols/Symbol-6.png' },
  { name: "pic7", image: 'symbols/Symbol-7.png' },
  { name: "pic8", image: 'symbols/Symbol-8.png' },
  { name: "pic9", image: 'symbols/Symbol-9.png' },
  { name: "pic10", image: 'symbols/Symbol-10.png' },
  { name: "pic11", image: 'symbols/Symbol-11.png' },
  { name: "pic12", image: 'symbols/Symbol-12.png' },
  { name: "pic13", image: 'symbols/Symbol-13.png' },
  { name: "pic14", image: 'symbols/Symbol-14.png' },
  { name: "pic15", image: 'symbols/Symbol-15.png' },
  { name: "pic16", image: 'symbols/Symbol-16.png' },
  { name: "pic17", image: 'symbols/Symbol-17.png' },
  { name: "pic18", image: 'symbols/Symbol-18.png' },
  { name: "pic19", image: 'symbols/Symbol-19.png' },
  { name: "pic20", image: 'symbols/Symbol-20.png' }
];

//game is initially stated when reloading page
//to make animation happen on reload, not only restart
window.onload = () => {
  matrixGenerator(generateRandom());
}

//pick random objects from the items array
const generateRandom = () => {
  //temporary array to make sure that the original array doesn't change
  let tempArray = [...symbols];
  //cardValues array holds randomly selected objects
  let cardValues = [];
  //loop iterates 40 times for random objects
  for (let i = 0; i < 40; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    //random index is generated based on whole number between 0 and the lenght of tempArray
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
    //once selected, remove the object from the tempArray and return
  }
  return cardValues;
};

//generating the matrix of cards based on card values
const matrixGenerator = (cardValues) => {
  gridContainer.innerHTML = "";
  //resets/clears game board
  cardValues = [...cardValues, ...cardValues];
  //creates matching pairs of each card value (makes the game funtioning)
  cardValues.sort(() => Math.random() - 0.5);
  //shuffles card on the game board
  for (let i = 0; i < 40; i++) {
    //create the 40 cards
    //data-card-values stores card names to match
    const card = createCard(cardValues[i]);
    card.classList.add("deal-animation");
    //add animation class to each card
    gridContainer.appendChild(card);
    //remove animation class after short delay
    setTimeout(() => {
      card.classList.remove("deal-animation");
    }, 1000);
  }
};


//creates card element with front and backside
//symbol applies on backside of card
function createCard(symbol) {

  //creates <div> card elements and assigns "card" to it
  console.log("Cards created.");
  const card = document.createElement('div');
  card.classList.add('card');

  //appendChild assigns the backSide as a child of card
  const frontSide = document.createElement('div');
  frontSide.classList.add('front-side');
  card.appendChild(frontSide);

  const backSide = document.createElement('div');
  backSide.classList.add('back-side');
  card.appendChild(backSide);

  //triggers when a card is clicked
  card.addEventListener('click', function () {
    if (!card.classList.contains('flipped') && !card.classList.contains('face-up') && openedCards.length < 2) {
      console.log("Card clicked.");

      //checks if timer started, then sets the interval
      if (!timerStarted) {
        timerStarted = true;
        timerInterval = setInterval(timeGenerator, 1000);
      }

      //adds 'flipped' class, background image and logs the cardName
      card.classList.add('flipped');
      const imgElement = card.querySelector('.back-side');
      const cardName = card.getAttribute('data-name');
      console.log(cardName);
      imgElement.style.backgroundImage = `url(${cardName})`;

      //checks if card match with a delay of 0.5 sec
      openedCards.push(card);
      if (openedCards.length === 2) {
        setTimeout(checkMatchingCards, 500);
      }
    } else if (card.classList.contains('flipped') && !card.classList.contains('face-up')) {
      //do nothing if the card is already flipped and not face-up (matched)
      return;
    } else {
      //if cards don't match, it removes the flip status and openedCards array
      card.classList.remove('flipped');
      openedCards.splice(openedCards.indexOf(card), 1);
    }
  });

  //sets "data-name" attribute of the card to the image URL
  //returns card element
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

    //clears opened cards as they are now matched not opened
    openedCards = [];

    //if both card match, add "matched" class
    card1.classList.add("matched", "match-animation");
    card2.classList.add("matched", "match-animation");

    //hide the matched cards after a delay of 0.3 sec
    setTimeout(() => {
      card1.style.opacity = '0';
      card2.style.opacity = '0';
    }, 300);

    //logging the match in console
    console.log("Two cards matched.")

    //adds overlay with delay if score is 40
    //if i had more cards/levels i could write cards.length instead of 40
    if (score === 40) {
      clearInterval(timerInterval);
      showOverlayWithDelay();
    }
  } else {
    //flips back cards if they're not matching (delay of 0.6 sec)
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      //removes 'flipped' class as the cards are no longer flipped
      const imgElement1 = card1.querySelector('.back-side');
      const imgElement2 = card2.querySelector('.back-side');
      imgElement1.style.backgroundImage = '';
      imgElement2.style.backgroundImage = '';
      //removes background image

      openedCards = [];
    }, 600);
  }
}


//overlay with 0.45 sec delay function
function showOverlayWithDelay() {
  setTimeout(function () {
    document.getElementById('overlay-score').textContent = 'Score: ' + score;
    document.getElementById('overlay-time').textContent = timerValue.textContent;
    showOverlay();

    //log
    console.log("Overlay shown.")
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

  //logging the restart
  console.log("Game restarted.")
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
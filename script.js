console.log('JavaScript code loaded');

const gridContainer = document.getElementById('grid-container');
const restartButton = document.querySelector('.restart-button');
let openedCards = [];
let score = 0;

restartButton.addEventListener('click', restartGame);

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

const cards = symbols.concat(symbols); // duplicate the symbols array to get the pairs

shuffle(cards); // shuffle the array randomly

for (let i = 0; i < cards.length; i++) {
  const card = createCard(cards[i]);
  gridContainer.appendChild(card);
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  
  const frontSide = document.createElement('div');
  frontSide.classList.add('front-side');
  card.appendChild(frontSide);
  
  const backSide = document.createElement('div');
  backSide.classList.add('back-side');
  backSide.style.backgroundImage = `url(${symbol})`;
  card.appendChild(backSide);
  
  card.addEventListener('click', function () {
    if (!card.classList.contains('flip') && openedCards.length < 2) {
      card.classList.add('flip');
      openedCards.push(card);
      if (openedCards.length === 2) {
        checkMatchingCards();
      }
    } else {
      card.classList.remove('flip');
      openedCards.splice(openedCards.indexOf(card), 1);
    }
  });
  
  return card;
}

function checkMatchingCards() {
  const card1 = openedCards[0];
  const card2 = openedCards[1];
  const symbol1 = card1.querySelector('.back-side').style.backgroundImage;
  const symbol2 = card2.querySelector('.back-side').style.backgroundImage;

  if (symbol1 === symbol2) {
    score += 2;
    updateScore(score);
    openedCards = [];

    if (score === cards.length) {
      setTimeout(function () {
        alert('Congratulations! You won the game!');
        restartGame();
      }, 500);
    }
  } else {
    setTimeout(function () {
      card1.classList.remove('flip');
      card2.classList.remove('flip');
      openedCards = [];
    }, 800);
  }
}

function updateScore(score) {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = 'Score: ' + score;
}

function restartGame() {
  openedCards = [];
  score = 0;
  updateScore(score);

  const gridItems = document.querySelectorAll('.card');
  gridItems.forEach(function (item) {
    item.remove();
  });

  shuffle(cards);

  for (let i = 0; i < cards.length; i++) {
    const card = createCard(cards[i]);
    gridContainer.appendChild(card);
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
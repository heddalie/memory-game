console.log('JavaScript code loaded');
// i'll keep this until i don't have problems

let columns = 8;
let rows = 5;

//ERR_FILE_NOT_FOUND
function generateBackImages() {
    const backImages = [
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
    return backImages;
}


// cards are clickable, but file error. cards compare incorrectly
class Card {
    constructor(backImage, onClick) {
        this.show = false;
        this.onClick = onClick;

        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('cards-container');
        this.cardElement.addEventListener('click', onClick);

        this.cardBack = document.createElement('div');
        this.cardBack.classList.add('card', 'card-back');
        this.cardBack.style.backgroundImage = `url(${backImage})`;

        this.cardFront = document.createElement('div');
        this.cardFront.classList.add('symbol', 'card', 'card-front');
        this.cardFront.innerHTML = '<i class="fa-solid fa-' + '"></i>';

        this.cardElement.appendChild(this.cardBack);
        this.cardElement.appendChild(this.cardFront);

        this.updateDisplay();
    }

    attachTo(container) {
        container.appendChild(this.cardElement);
    }

    updateDisplay() {
        this.cardBack.style.display = this.show ? 'block' : 'none';
        this.cardFront.style.display = this.show ? 'none' : 'flex';
    }

    flip() {
        this.show = !this.show;
        this.updateDisplay();
    }

    disable() {
        this.cardBack.style.display = 'none';
        this.cardFront.style.display = 'none';
        this.cardElement.removeEventListener('click', this.onClick);
    }
}

class CardGrid {
    constructor(numberOfColumns, numberOfRows, backImages, restartCallback) {
        const root = document.documentElement;
        root.style.setProperty('--card-columns', numberOfColumns);
        root.style.setProperty('--card-rows', numberOfRows);

        const imagesCopy = backImages.slice();

        this.cards = [];
        this.selected = [];
        this.solveTimer = null;
        this.restartCallback = restartCallback;

        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfColumns; j++) {
                const backIndex = Math.floor(Math.random() * imagesCopy.length);
                const backImage = imagesCopy[backIndex];
                imagesCopy.splice(backIndex, 1);

                const card = new Card(backImage, () => this.cardFlip(card));
                this.cards.push(card);
            }
        }
    }

    restart() {
        if(typeof this.restartCallback === 'function') {
            this.restartCallback();
        }
    }

    attachTo(container) {
        for (const card of this.cards) {
            card.attachTo(container);
        }
    }

    cardFlip(card) {
        if (this.selected.length < 2 && !this.selected.includes(card)) {
            this.selected.push(card);
            card.flip();
        }

        if (this.selected.length === 2 && this.solveTimer === null) {
            this.solveTimer = setTimeout(() => {
                this.checkSelection();
                this.solveTimer = null;
            }, 1000);
        }
    }

    checkSelection() {
        if (this.selected[0].symbol === this.selected[1].symbol) {
            for (const card of this.selected) {
                card.disable();

                const index = this.cards.indexOf(card);

                if (index !== -1) {
                    this.cards.splice(index, 1);
                }
            }
        } else {
            for (const card of this.selected) {
                card.flip();
            }
        }

        this.selected = [];
    }
}

function restartGame() {
    const cardsGrid = document.querySelector('.cards');
    cardsGrid.innerHTML = '';

    const backImages = generateBackImages();
    const cards = new CardGrid(columns, rows, backImages, restartGame);
    cards.attachTo(cardsGrid);
}

window.addEventListener('load', () => {
    if (screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary') {
        columns = 5;
        rows = 8;
    }

    const cardsGrid = document.querySelector('.cards');
    const restartButton = document.querySelector('.restart-button');

    const backImages = generateBackImages();

    const cards = new CardGrid(columns, rows, backImages, restartGame);
    cards.attachTo(cardsGrid);

    restartButton.addEventListener('click', () => {
        cards.restart();
    });
});

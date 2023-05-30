console.log('JavaScript code loaded');

function generateBackImages() {
    const backImages = [
            'coding-1/memory-game/symbols/Symbol-1.png',
            'coding-1/memory-game/symbols/Symbol-2.png',
            'coding-1/memory-game/symbols/Symbol-3.png',
            'coding-1/memory-game/symbols/Symbol-4.png',
            'coding-1/memory-game/symbols/Symbol-5.png',
            'coding-1/memory-game/symbols/Symbol-6.png',
            'coding-1/memory-game/symbols/Symbol-7.png',
            'coding-1/memory-game/symbols/Symbol-8.png',
            'coding-1/memory-game/symbols/Symbol-9.png',
            'coding-1/memory-game/symbols/Symbol-10.png',
            'coding-1/memory-game/symbols/Symbol-11.png',
            'coding-1/memory-game/symbols/Symbol-12.png',
            'coding-1/memory-game/symbols/Symbol-13.png',
            'coding-1/memory-game/symbols/Symbol-14.png',
            'coding-1/memory-game/symbols/Symbol-15.png',
            'coding-1/memory-game/symbols/Symbol-16.png',
            'coding-1/memory-game/symbols/Symbol-17.png',
            'coding-1/memory-game/symbols/Symbol-18.png',
            'coding-1/memory-game/symbols/Symbol-19.png',
            'coding-1/memory-game/symbols/Symbol-20.png'
        ];
        return backImages;
    }

const symbols = [
    'symbol-1',
    'symbol-2',
    'symbol-3',
    'symbol-4',
    'symbol-5',
    'symbol-6',
    'symbol-7',
    'symbol-8',
    'symbol-9',
    'symbol-10',
    'symbol-11',
    'symbol-12',
    'symbol-13',
    'symbol-14',
    'symbol-15',
    'symbol-16',
    'symbol-17',
    'symbol-18',
    'symbol-19',
    'symbol-20'
];

class Card {
    constructor(symbol, backImage, onClick) {
        this.symbol = symbol;
        this.show = false;
        this.onClick = onClick;

        this.cardElement = document.createElement('div');
        this.cardElement.classList.add('cards-container');
        this.cardElement.addEventListener('click', onClick);

        this.cardBack = document.createElement('div');
        this.cardBack.classList.add('card');
        this.cardBack.style.backgroundImage = `url(${backImage})`;

        this.cardFront = document.createElement('div');
        this.cardFront.classList.add('symbol');
        this.cardFront.innerHTML = '<i class="fa-solid fa-' + symbol + '"></i>';

        this.cardElement.appendChild(this.cardBack);
        this.cardElement.appendChild(this.cardFront);

        this.updateDisplay();
    }

    attachTo(container) {
        container.appendChild(this.cardElement);
    }

    updateDisplay() {
        this.cardBack.style.display = this.show ? 'none' : 'block';
        this.cardFront.style.display = this.show ? 'flex' : 'none';
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
    constructor(numberOfColumns, numberOfRows, backImages) {
        const root = document.documentElement;
        root.style.setProperty('--card-columns', numberOfColumns);
        root.style.setProperty('--card-rows', numberOfRows);

        const deck = symbols.concat(symbols);
        const imagesCopy = backImages.slice();

        this.cards = [];
        this.selected = [];
        this.solveTimer = null;

        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfColumns; j++) {
                const deckIndex = Math.floor(Math.random() * deck.length);
                const symbol = deck[deckIndex];
                deck.splice(deckIndex, 1);

                const backIndex = Math.floor(Math.random() * imagesCopy.length);
                const backImage = imagesCopy[backIndex];
                imagesCopy.splice(backIndex, 1);

                const card = new Card(symbol, backImage, () => this.cardFlip(card));
                this.cards.push(card);
            }
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

window.addEventListener('load', () => {
    let columns = 8;
    let rows = 5;

    if (screen.orientation.type === 'portrait-primary' || screen.orientation.type === 'portrait-secondary') {
        columns = 5;
        rows = 8;
    }

    const cardsGrid = document.querySelector('.cards');

    const backImages = generateBackImages();

    const cards = new CardGrid(columns, rows, backImages);
    cards.attachTo(cardsGrid);
})

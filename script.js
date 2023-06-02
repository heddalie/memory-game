console.log('JavaScript code loaded');
// i'll keep this until i don't have problems


// responsive grid
window.addEventListener('DOMContentLoaded', () => { //makes sure DOM is loaded
    const gridContainer = document.getElementById('gridContainer');
    resizeSquares();

    //resizeSquares will calculate the square size for the cards

    window.addEventListener('resize', resizeSquares);

    function resizeSquares() {
        const containerWidth = gridContainer.offsetWidth;
        const squareSize = containerWidth / 8 - 5; //the -1 is for the gapsize
        const gridItems = Array.from(gridContainer.getElementsByClassName('grid-item'));

        gridItems.forEach(item => {
            item.style.width = squareSize + 'px';
            item.style.height = squareSize + 'px';
        });
    }
    });
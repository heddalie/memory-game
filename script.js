console.log('JavaScript code loaded');
// i'll keep this until i don't have problems

// responsive grid
window.addEventListener('DOMContentLoaded', () => { //makes sure DOM is loaded
    const gridContainer = document.getElementById('gridContainer');
    const gridItems = Array.from(gridContainer.getElementsByClassName('grid-item'));
    
    resizeGrid();

    //i want to resize the screen while still keeping the grid 8x5

    window.addEventListener('resize', resizeGrid);

    function resizeGrid() {
        const containerWidth = gridContainer.clientWidth;

        const aspectRatio = 8 / 5; // setting up the grid

        // grid will resize according to available space
        // still an issue with keeping the cards squared
        const availableWidth = window.innerWidth;
        const availableHeight = window.innerHeight;
        const maxContainerWidth = availableWidth * 0.8;

        let itemWidth = maxContainerWidth / 8;
        let itemHeight = itemWidth / aspectRatio;

        if (itemHeight > availableHeight) {
            itemHeight = availableHeight;
            itemWidth = itemHeight * aspectRatio;
        }

        gridItems.forEach((item) => {
            item.style.width = itemWidth + 'px';
            item.style.height = itemHeight + 'px';
        })

        gridContainer.style.width = width * 8 + 'px';
        gridContainer.style.height = height * 5 + 'px';
    }
});
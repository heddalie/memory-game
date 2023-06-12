console.log('JavaScript code loaded');

const gridContainer = document.getElementById('grid-container');

const rows = 5;
const columns = 8;

gridContainer.style.gridTemplateColumns="repeat("+columns+",1fr)";

for (let i = 0; i < rows * columns; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridContainer.appendChild(gridItem);

    gridItem.innerHTML=i;
    console.log(i)

    gridItem.addEventListener('click', function(event) {
        const clickedElement = event.target;
    
        console.log('Clicked on field:', clickedElement);
    });
}
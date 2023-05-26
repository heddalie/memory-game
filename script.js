// numX or numY changes amounts of rows and colums
    // size changes the rectangles

    let numX = 8;
    let numY = 5;
    let size = 5;

    grid(numX, numY, size);

    // function grid()
    function grid(x, y, size) {
      const gridRectangles = document.getElementById('gridRectangles');
      
      // for loop to generate rectangles. outer for is x, inner for is y
      for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
          const gridItem = document.createElement('div');
          gridItem.classList.add('grid-item');
          gridItem.style.width = `${size}px`;
          gridItem.style.height = `${size}px`;
          gridRectangles.appendChild(gridItem);
        }
      }
    }
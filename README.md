# ConwayGameOfLife


John Conway's Game of Life: Web app implementation

Current functionalities:
1) Can set initial configuration and start/stop the game
2) Reset button to reset the grid

Current issues to be fixed:
1) Styling is not great
2) HTML canvas size is fixed and not responsive => CSS styling cannot be used as CSS stretches the canvas and cannot map the mouseclick events to square cells properly.
3) Cannot zoom in or zoom out of canvas or change the size of cells visible in the canvas via the web page.=> See 4
4) Grid size is fixed and dependent on the fixed height and width of canvas. => Should implement a big 1000x1000 grid and based on the size of cells, only show a part of the grid on the canvas
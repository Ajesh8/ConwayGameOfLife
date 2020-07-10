

var startButton 	= document.getElementById("start");
var stopButton 		= document.getElementById("stop");
var resetButton 	= document.getElementById("reset");
var gofcanvas 		= document.getElementById("gofcanvas"); //Getting the html canvas by ID
var interval 		= null; //Interval variable to stop the game of life any instant
var zoom 			= 1;
var resolution 		= 20; //Resolution depicting the size of square
//rows and cols variable calculated based on canvas height and width 
var rows 			= Math.floor(gofcanvas.height/resolution); 
var cols 			= Math.floor(gofcanvas.width/resolution);
var grid 			= new Array(rows); //grid array will contain the current generation status
var nextgrid 		= new Array(rows); //nextgrid will containt the next generation status
var cgof 			= gofcanvas.getContext("2d");



cgof.fillStyle = "#b3b3cc"; //Filling the canvas with default dead cell color
cgof.fillRect(0, 0, gofcanvas.width, gofcanvas.height);
cgof.strokeStyle = "#666699";
function initializeGrid() //Initialize the grid and nextgrid based on rows and cols
{
	for(var i=0;i<rows;i++)
	{
		grid[i]=new Array(cols);
		nextgrid[i]= new Array(cols);
	}
	resetGrid(grid);
	resetGrid(nextgrid);
	resetCanvas();
}
function resetGrid(arr) //Reset all the values in the passed 2D array to 0
{
	for(var i=0;i<arr.length;i++)
		{
			for(var j=0;j<arr[0].length;j++)
				{
					arr[i][j]=0;
				}
		}
}
function resetCanvas(){ //Redraws the canvas with all cells painted with color corresponding dead cell
	for(var i=0;i<rows;i++)
		{
			for(var j=0;j<cols;j++)
				{
					makeDead(i,j);
				}
		}
}

function makeAlive(i,j,arr) //Given the value of i and j, sets the value of grid at index (i,j) to 1 and paints that cell in canvas to yellow
{
	grid[i][j]=1;
	cgof.fillStyle="yellow";
	cgof.fillRect(j*resolution,i*resolution,resolution-1,resolution-1);
	cgof.strokeRect(j*resolution,i*resolution,resolution-1,resolution-1);

}
function makeDead(i,j) //Given the value of i and j, sets the value of grid at index (i,j) to 0 and paints that cell in canvas to color corresponding dead cell
{
	grid[i][j]=0;
	cgof.fillStyle="#b3b3cc";
	cgof.fillRect(j*resolution,i*resolution,resolution-1,resolution-1);
	cgof.strokeRect(j*resolution,i*resolution,resolution-1,resolution-1);

}
function clickObj(x,y){ //Object constructor to get the coordinates of the point clicked on canvas
	this.x=x;
	this.y=y;
}

function getCursorPosition(canvas, event) { //Calculates the coordinates of an event relative to canvas
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    var obj=new clickObj(x,y);
    return obj;
}
gofcanvas.addEventListener('mousedown', function(e) { //Adding mousedown event for canvas before starting the game for providing the initial configuration
    var Obj=getCursorPosition(gofcanvas, e); //Getting the click coordinates relative to canvas
    let x=Math.floor(Obj.x); //Flooring the coordinates to have them in numeric instead of float
    let y=Math.floor(Obj.y);
    var i=Math.floor(y/resolution); //Calculating index i and j based on the y and x coordinates and dividing it by resolution
    var j=Math.floor(x/resolution);
    if(grid[i][j]==0)   //If cell is dead, make it alive
    	makeAlive(i,j);
    else 				//If cell is alive, make it dead
    	makeDead(i,j);
});

initializeGrid(); //Calling initiliaze grid function to initialize the 2D arrays and paint the canvas

async function gameOfLife(){ //Function to calculate the next generation of cell based on current state

		for(var i=0;i<rows;i++) //Iterating through all the cells in the grid
		{
			for(var j=0;j<cols;j++)
			{	var neighbors=0;
				if(i>0) 		//Counting neighbours on the row one above the current cell
				{
					for(var k=0;k<3;k++)
					{
						if(j-1+k>=0 && j-1+k<cols)
						{
							if(grid[i-1][j-1+k]==1)
								++neighbors;
						}
					}
				}
				if(j-1>=0 && grid[i][j-1]==1) //Counting neighbours on left and right of current cell
						++neighbors;
				if(j+1<cols && grid[i][j+1]==1)
						++neighbors;
				if(i<rows-1) 				//Counting neighbours on the row one below the current cell
				{
					for(var k=0;k<3;k++)
					{
						if(j-1+k>=0 && j-1+k<cols)
						{
							if(grid[i+1][j-1+k]==1)
								++neighbors;
						}
					}
				}
				if(grid[i][j]==1) //If cell is alive in current generation
				{
						if(neighbors>=2 && neighbors <=3) //Cell will remain alive next generation
							nextgrid[i][j]=1;
						else
							nextgrid[i][j]=0;			//Cell will die next generation
				}
				else
				{
					if(neighbors==3) //If cell is dead in current generation, it will become alive next generation
						nextgrid[i][j]=1;

				}


			}
		}

		for(var i=0;i<rows;i++)
		{
			for(var j=0;j<cols;j++)
			{
				if(grid[i][j]!=nextgrid[i][j]) //Painting the next generation of cells
					{
						if(grid[i][j]==0)
							makeAlive(i,j);
						else
							makeDead(i,j);
					}

			}
		}
		for(var i=0;i<rows;i++) //Resetting nextgrid to 0 for the next cycle
		{
			for(var j=0;j<cols;j++)
				{
					grid[i][j]=nextgrid[i][j];
					nextgrid[i][j]=0;
				}
		}
	
	
}

startButton.onclick=function() //Button to start the game of life
{	console.log("Started");
	interval=setInterval(function(){
		gameOfLife();
	},500); //Calling the game of life function inside a setInterval function so it can be stopped via Stop button
		
}

stopButton.onclick=function() //Button to stop the game of life
{
	clearInterval(interval); //Clears interval and the game stops
}

resetButton.onclick=function() //Stops the game and resets the grid, next grid and canvas to dead state.
{
	resetGrid(grid);
	resetGrid(nextgrid);
	resetCanvas();
	clearInterval(interval);
}
var table=document.getElementById("Grid");
var cont=true;
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var size=500;
var interval=null;
for(var i=0;i<200;i++)
{
	var row=table.insertRow(i);
	for(var j=0;j<200;j++)
	{
		row.insertCell(j);
	}
}
var tds= document.getElementsByTagName("td");

for(var i=0;i<tds.length;i++)
{
	tds[i].onclick= function(){
		this.classList.toggle("checked");
	}
}


var grid = new Array(202);
var nextgrid = new Array(202);
for(var i=0;i<202;i++)
{
	grid[i]=new Array(202);
	nextgrid[i]= new Array(202);
}

function timer(ms) {
 return new Promise(res => setTimeout(res, ms));
}


async function gameOfLife(){


	
	
		table=document.getElementById("Grid");
		for(var i=0;i<200;i++)
		{
			for(var j=0;j<200;j++)
			{
				if(table.rows[i].cells[j].classList.contains("checked"))
					{
						grid[i+1][j+1]=1;
						
					}

			}
		}

		for(var i=0;i<202;i++)
		{
			for(var j=0;j<202;j++)
			{	var neighbors=0;
				if(i>0)
				{
					for(var k=0;k<3;k++)
					{
						if(j-1+k>=0 && j-1+k<202)
						{
							if(grid[i-1][j-1+k]==1)
								++neighbors;
						}
					}
				}
				if(j-1>=0 && grid[i][j-1]==1)
						++neighbors;
				if(j+1<202 && grid[i][j+1]==1)
						++neighbors;
				if(i<201)
				{
					for(var k=0;k<3;k++)
					{
						if(j-1+k>=0 && j-1+k<202)
						{
							if(grid[i+1][j-1+k]==1)
								++neighbors;
						}
					}
				}
				if(grid[i][j]==1)
				{
						if(neighbors>=2 && neighbors <=3)
							nextgrid[i][j]=1;
						else
							nextgrid[i][j]=0;
				}
				else
				{
					if(neighbors==3)
						nextgrid[i][j]=1;

				}


			}
		}

		for(var i=0;i<200;i++)
		{
			for(var j=0;j<200;j++)
			{
				if(grid[i+1][j+1]!=nextgrid[i+1][j+1])
					table.rows[i].cells[j].classList.toggle("checked");

			}
		}
		for(var i=0;i<202;i++)
		{
			for(var j=0;j<202;j++)
				grid[i][j]=nextgrid[i][j];
		}
	
	
}

startButton.onclick=function()
{	console.log("Started");
	interval=setInterval(function(){
		gameOfLife();
	},1);
		
}

stopButton.onclick=function()
{
	clearInterval(interval);
}
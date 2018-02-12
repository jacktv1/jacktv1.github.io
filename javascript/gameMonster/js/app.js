const MAP_MONSTER_POS = [
	[0 , 0 , 0 , 0 , 168, 168, 80 ,80],
	[216 , 0 , 216 , 0 , 216, 168, 80 ,80],
	[430 , 0 , 430 , 0 , 262, 168, 80 ,80],
	[0 , 216 , 0 , 216 , 168, 216, 80 ,80],
	[430 , 216 , 430 , 216 , 310, 216, 80 ,80],
	[0 , 430 , 0 , 430 , 168, 262, 80 ,80],
	[216 , 430 , 216 , 430 , 216, 262, 80 ,80],
	[430 , 430 , 430 , 430 , 262, 262, 80,80]
];
const FPS = 60;
const TICKS = 1000 / FPS;

var gamePlay = new GamePlay();

reqAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
				window.oRequestAnimationFrame ;

if (reqAnimation) {
	gamePlay.gameController();
} else {
	alert("Your browser doesn't support requestAnimationFrame.");
}
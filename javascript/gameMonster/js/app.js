

var gamePlay = new GamePlay();

_reqAnimation = window.requestAnimationFrame ||

window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame ||
window.oRequestAnimationFrame ;

if (_reqAnimation) {
	gamePlay.updateGame();
} else {
	alert("Your browser doesn't support requestAnimationFrame.");
}



// var monster1 = new Monster(1, 0, 0, 70, 70, canvasGameEnviroment);
// gamePlay.update(1000);

//ctx.clearRect(0, 0, 500, 500);

// var monster2 = new Monster(1, 0, 215, 70, 70, ctx);
// var monster3 = new Monster(1, 0, 430, 70, 70, ctx);
// var monster4 = new Monster(1, 215, 0, 70, 70, ctx);
// var monster5 = new Monster(1, 430, 0, 70, 70, ctx);
// var monster6 = new Monster(1, 430, 215, 70, 70, ctx);
// var monster7 = new Monster(1, 430, 430, 70, 70, ctx);
// var monster8 = new Monster(2, 215, 410, 90, 90,ctx);
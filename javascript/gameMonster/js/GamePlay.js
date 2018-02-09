const MAP_MONSTER_POS = [
	[-70 , -70 , -70 , -70 , 216, 216, 70 ,70],
	[216 , -70 , 216 , -70 , 216, 216, 70 ,70],
	[500 , -70 , 500 , -70 , 216, 216, 70 ,70],
	[-70 , 216 , -70 , 216 , 216, 216, 70 ,70],
	[500 , 216 , 500 , 216 , 216, 216, 70 ,70],
	[-70 , 500 , -70 , 500 , 216, 216, 70 ,70],
	[216 , 500 , 216 , 500 , 216, 216, 70 ,70],
	[500 , 500 , 500 , 500 , 216, 216, 70 ,70]
];

class GamePlay
{
	constructor() {
		this.canvasMenu = document.getElementById('menu');
		this.ctxMenu = this.canvasMenu.getContext("2d");
		this.canvasGameEnviroment = document.getElementById('gameplay');
		this.ctx = this.canvasGameEnviroment.getContext("2d");
		this.lastUpdateTime = Date.now();
	 	this.listMonster = new Array();
	 	this.level = 1;
		this.speed = 2;
		this.score = "0";
		this.isShowedMonster = false;
		this.currentMonster = this.randomMonster();
		console.log(this.currentMonster);
		this.bloodList = new Array();
		this.initGameEnviroment();
		
		this.clickOnMonster();

	}

	initGameEnviroment() {
		
		var background = new Image();
		background.src = "images/bg.jpg"; 
		
		var menubackground = new Image();
		menubackground.src = "images/bgmenu.png";

		var menubackground = new Image();
		menubackground.src = "images/bgmenu.png";

		var btnRefresh = new Image();
		btnRefresh.src = "images/icons/btnrefresh.png";

		var btnPause = new Image();
		btnPause.src = "images/icons/btnpause.png";

		var btnBom = new Image();
		btnBom.src = "images/icons/bomb.png"; 

		var heart = new Image();
		heart.src = "images/icons/heart.png"; 

		var score = new Image();
		score.src = "images/icons/star.png"; 

		var blood = new Image();
		blood.src = "images/monsters/blood.png"; 

		this.ctx.drawImage(background,0,0,500,500);
		this.ctxMenu.drawImage(menubackground,0,0,500,100);		
		this.ctxMenu.drawImage(menubackground,0,0,500,100);		
		this.ctxMenu.drawImage(btnRefresh,340,35,55,55);
		this.ctxMenu.drawImage(btnPause,400, 42,40,38);
		this.ctxMenu.drawImage(btnBom,450, 40,40,40);
		this.ctxMenu.drawImage(heart,10, 15,30,30);
		this.ctxMenu.drawImage(score,10, 40,40,40);
		this.ctxMenu.font = "50px Consolas";
		this.ctxMenu.fillStyle = "White";
		this.ctxMenu.fillText(this.score, 60, 80);

		for (var i = 0; i< this.bloodList.length; i++) {
			this.ctx.drawImage(blood,this.bloodList[i].posX,this.bloodList[i].posY,50,50);
		}
		
	}

	initListMonster(index) {
		this.listMonster[index] = new Monster(
			this.level, 
			MAP_MONSTER_POS[index][0], 
			MAP_MONSTER_POS[index][1], 
			MAP_MONSTER_POS[index][2], 
			MAP_MONSTER_POS[index][3], 
			MAP_MONSTER_POS[index][4], 
			MAP_MONSTER_POS[index][5], 
			MAP_MONSTER_POS[index][6], 
			MAP_MONSTER_POS[index][7], 
			this.ctx
		);	
	}

	updateGame() {
		this.initGameEnviroment();

		if (this.listMonster[this.currentMonster].posX == this.listMonster[this.currentMonster].toX && 
			this.listMonster[this.currentMonster].posY == this.listMonster[this.currentMonster].toY) 
		{
			
			this.listMonster[this.currentMonster].posX = this.listMonster[this.currentMonster].toX;
			this.listMonster[this.currentMonster].posY = this.listMonster[this.currentMonster].toY;
			this.listMonster[this.currentMonster].toX = this.listMonster[this.currentMonster].defaultX;
			this.listMonster[this.currentMonster].toY = this.listMonster[this.currentMonster].defaultY;
		}

		if (this.listMonster[this.currentMonster].posX < this.listMonster[this.currentMonster].toX) {

			this.listMonster[this.currentMonster].posX += (this.speed);

		} else if (this.listMonster[this.currentMonster].posX > this.listMonster[this.currentMonster].toX) {

			this.listMonster[this.currentMonster].posX -= (this.speed);
		}

		if (this.listMonster[this.currentMonster].posY < this.listMonster[this.currentMonster].toY) {

			this.listMonster[this.currentMonster].posY += (this.speed);

		} else if (this.listMonster[this.currentMonster].posY > this.listMonster[this.currentMonster].toY) {

			this.listMonster[this.currentMonster].posY -= (this.speed);
		}

		if (this.listMonster[this.currentMonster].posX == this.listMonster[this.currentMonster].defaultX && 
			this.listMonster[this.currentMonster].posY == this.listMonster[this.currentMonster].defaultY) 
		{

			this.listMonster[this.currentMonster].visible = false;

			this.currentMonster = this.randomMonster();
		}
		
		if (this.listMonster[this.currentMonster].died) {
			this.listMonster[this.currentMonster].posX = this.listMonster[this.currentMonster].toX;
			this.listMonster[this.currentMonster].posY = this.listMonster[this.currentMonster].toY;
			this.listMonster[this.currentMonster].toX = this.listMonster[this.currentMonster].defaultX;
			this.listMonster[this.currentMonster].toY = this.listMonster[this.currentMonster].defaultY;
		}
		else {
			this.listMonster[this.currentMonster].moveMonster();
		}

		
		requestAnimationFrame(this.updateGame.bind(this));

		
	}
	
	clickOnMonster() {
		this.isClickOnMonster = event => {
			var mouseClickX = event.pageX - this.canvasGameEnviroment.offsetLeft;
			var mouseClickY = event.pageY - this.canvasGameEnviroment.offsetTop;
			if (mouseClickX > this.listMonster[this.currentMonster].posX) {
				var blood = {
					posX: mouseClickX,
					posY: mouseClickY
				};
				this.bloodList.push(blood);
				if (this.bloodList.length > 5) {
					console.log(this.bloodList.length);
					this.bloodList.splice(0,1);
				}
				this.score = parseInt(this.score)+5;
				this.listMonster[this.currentMonster].died = true;

			}
			
		}
		this.canvasGameEnviroment.onclick = this.isClickOnMonster;
	}
	randomMonster() {
		var ran = Math.floor(Math.random() * 7) + 0;
		this.initListMonster(ran);
		return ran;
	}
}



	
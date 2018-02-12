class GamePlay
{

	/**
	* This below functio is constructor of class GamePlay
	*/

	constructor() {

		this.canvasMenu = document.getElementById('menu');
		this.menuContext = this.canvasMenu.getContext("2d");
		this.canvasGameEnviroment = document.getElementById('gameplay');
		this.gameContext = this.canvasGameEnviroment.getContext("2d");

		this.destroyMonsterSound = new Audio("sounds/destroy_monster_sound.mp3");
		this.boomSound = new Audio("sounds/boom_sound.mp3");

		this.start();
	}

	/**
	* This below function define class variable
	*/

	start() {		

		this.lastUpdateTime = Date.now();
	 	this.level = 1;
		this.speed = this.level * 2;
		this.heart = 3;
		this.score = "100";

		this.isStarted = false;
		this.isPaused = false;
		this.isGameOver = false;
		this.numberOfBomb = 3;
		this.listMonster = new Array();
		this.listRandomMonster = new Array();
		this.numberOfMonster = this.level;
		this.bloodList = new Array();

		this.initGameEnviroment();
		this.initListMonster();
		this.clickOnGameArea();
		this.clickOnMenuControl();
	}

	/**
	* This below function is draw backgroud and controls of game
	*/

	initGameEnviroment() {
		
		var background = new Image();
		background.src = "images/bg.jpg"; 

		var btnRefresh = new Image();
		btnRefresh.src = "images/icons/btnrefresh.png";

		var btnPause = new Image();
		btnPause.src = "images/icons/btnpause.png";

		var btnBomb = new Image();
		btnBomb.src = "images/icons/bomb.png"; 

		var heart = new Image();
		heart.src = "images/icons/heart.png"; 

		var scoreIcon = new Image();
		scoreIcon.src = "images/icons/star.png"; 

		var blood = new Image();
		blood.src = "images/monsters/blood.gif"; 


		var drawBackground = () => {
			this.menuContext.fillStyle = "#272727";
			this.menuContext.fillRect(0,0,500,100);

			if (!this.isStarted) {

				this.gameContext.fillStyle = "#272727";
				this.gameContext.fillRect(0,0,500,500);

				this.gameContext.font = "italic bold 50px Consolas";
				this.gameContext.fillStyle = "#FF0080";
				this.gameContext.fillText("GAME MONSTER",90,50);

			
				this.gameContext.strokeStyle = "#F5DF0F";
			    this.gameContext.lineWidth = 5;
			    this.gameContext.strokeRect(100,155,300,60);


				this.gameContext.font = "italic bold 40px Consolas";
				this.gameContext.fillStyle = "#F5DF0F";
				this.gameContext.fillText("START GAME",145,200);

				var highScore = 0;
				if (sessionStorage.getItem("highScore") != null) {
					highScore = sessionStorage.getItem("highScore");
				}
				this.gameContext.font = "italic 30px Consolas";
				this.gameContext.fillStyle = "#FF0080";
				this.gameContext.fillText("HIGH SCORE: " + highScore,100,270);

			} else if (this.isGameOver) {

				this.gameContext.fillStyle = "#272727";
				this.gameContext.fillRect(0,0,500,500);

				this.gameContext.font = "italic bold 50px Consolas";
				this.gameContext.fillStyle = "#FF0080";
				this.gameContext.fillText("GAME MONSTER",90,50);

			
				this.gameContext.strokeStyle = "#F5DF0F";
			    this.gameContext.lineWidth = 5;
			    this.gameContext.strokeRect(100,155,300,60);


				this.gameContext.font = "italic bold 40px Consolas";
				this.gameContext.fillStyle = "#fff";
				this.gameContext.fillText("TRY AGAIN",150,200);

				var highScore = 0;
				if (sessionStorage.getItem("highScore") != null) {
					highScore = sessionStorage.getItem("highScore");
				}
				this.gameContext.font = "italic 30px Consolas";
				this.gameContext.fillStyle = "#FF0080";
				this.gameContext.fillText("HIGH SCORE: " + highScore,100,270);


			} else {

				// Draw game background
				this.gameContext.drawImage(background,0,0,500,500);

				// Draw button Refresh
				this.menuContext.drawImage(btnRefresh,340,42,40,38);

				// Draw button Pause
				this.menuContext.drawImage(btnPause,390,42,40,38);

				// Draw button boom
				this.menuContext.drawImage(btnBomb,440,42,40,35);
				this.menuContext.font = "italic bold 20px Consolas";
				this.menuContext.fillStyle = "#F5DF0F";
				this.menuContext.fillText(this.numberOfBomb,480,50);

				// Draw score
				this.menuContext.drawImage(scoreIcon,10, 40,40,40);
				this.menuContext.font = "50px Consolas";
				this.menuContext.fillStyle = "White";
				this.menuContext.fillText(this.score, 60, 80);

				// Draw heart
				for (var i = 0; i < this.heart; i++) {
					this.menuContext.drawImage(heart, (35 * i) + 15, 5, 30, 30);
				}

				// Draw blood
				for (var i = 0; i< this.bloodList.length; i++) {
					this.gameContext.drawImage(blood,this.bloodList[i].posX,this.bloodList[i].posY,50,50);
				}

			}
		}
		background.onload = drawBackground;
	}

	/**
	* This below fucntion init list monsters are displayed
	*/

	initListMonster() {
		this.listMonster.splice(0,this.listMonster.length);
		this.listRandomMonster.splice(0,this.listRandomMonster.length);
		for (var i = 0; i < this.numberOfMonster; i++) {

			var random = Math.floor(Math.random() * 7) + 0;
			
			while (this.listRandomMonster.indexOf(random) !== -1) {
				random = Math.floor(Math.random() * 7) + 0;
			}

			var monster = new Monster(
				this.level, 
				MAP_MONSTER_POS[random][0], 
				MAP_MONSTER_POS[random][1], 
				MAP_MONSTER_POS[random][2], 
				MAP_MONSTER_POS[random][3], 
				MAP_MONSTER_POS[random][4], 
				MAP_MONSTER_POS[random][5], 
				MAP_MONSTER_POS[random][6], 
				MAP_MONSTER_POS[random][7], 
				this.gameContext
			);

			this.listMonster.push(monster);
			this.listRandomMonster.push(random);
		}
	}

	/**
	* This below function replace a monster at position "index" in list monster by a random monster
	* @param {int} index
	*/

	randomMonster(index) {

		var random = Math.floor(Math.random() * 7) + 0;
			
		while (this.listRandomMonster.indexOf(random) !== -1) {
			random = Math.floor(Math.random() * 7) + 0;
		}

		var monster = new Monster(
			this.level, 
			MAP_MONSTER_POS[random][0], 
			MAP_MONSTER_POS[random][1], 
			MAP_MONSTER_POS[random][2], 
			MAP_MONSTER_POS[random][3], 
			MAP_MONSTER_POS[random][4], 
			MAP_MONSTER_POS[random][5], 
			MAP_MONSTER_POS[random][6], 
			MAP_MONSTER_POS[random][7], 
			this.gameContext
		);
	
		this.listMonster[index] = monster;
		this.listRandomMonster[index] = random;
			
	}

	/**
	* This below function update postion of monsters and update score
	*/

	updateGame() {

		this.initGameEnviroment();
		
		for (var i = 0; i < this.numberOfMonster; i++) {
			
			// Change monster direction if current position equal destination position

			if (this.listMonster[i].posX == this.listMonster[i].toX && 
				this.listMonster[i].posY == this.listMonster[i].toY) 
			{
				
				this.listMonster[i].posX = this.listMonster[i].toX;
				this.listMonster[i].posY = this.listMonster[i].toY;
				this.listMonster[i].toX = this.listMonster[i].defaultX;
				this.listMonster[i].toY = this.listMonster[i].defaultY;
			}

			// Change position of monster 

			if (this.listMonster[i].posX < this.listMonster[i].toX) {

				this.listMonster[i].posX += (this.speed);

			} else if (this.listMonster[i].posX > this.listMonster[i].toX) {

				this.listMonster[i].posX -= (this.speed);
			}

			if (this.listMonster[i].posY < this.listMonster[i].toY) {
		
				this.listMonster[i].posY += (this.speed);

			} else if (this.listMonster[i].posY > this.listMonster[i].toY) {
				
				this.listMonster[i].posY -= (this.speed);
			}
			
			// Hide monster if current position equal starting position and replace it with a random monster

			if (this.listMonster[i].posX == this.listMonster[i].defaultX && 
				this.listMonster[i].posY == this.listMonster[i].defaultY) 
			{
				
				this.listMonster[i].visible = false;
				this.score = parseInt(this.score) - 5;
				this.randomMonster(i);
			}
			
			// Hide monster if monster is died and replace it with a random monster

			if (this.listMonster[i].died) {

				this.listMonster[i].posX = this.listMonster[i].toX;
				this.listMonster[i].posY = this.listMonster[i].toY;
				this.listMonster[i].toX = this.listMonster[i].defaultX;
				this.listMonster[i].toY = this.listMonster[i].defaultY;

				this.listMonster[i].visible = false;
				this.randomMonster(i);
			}
			else {
				this.listMonster[i].moveMonster();
			}
		}

	}
	
	/**
	* This below function is event when click on game canvas
	*/

	clickOnGameArea() {
		var onClickMonster = event => {
			var mouseClickX = event.pageX - this.canvasGameEnviroment.offsetLeft;
			var mouseClickY = event.pageY - this.canvasGameEnviroment.offsetTop;

			// Check if click on button "start game" or click on button "try again" or click on monster

			if (!this.isStarted && mouseClickX >= 100 && mouseClickX <= 400 && mouseClickY >= 155 && mouseClickY <= 215) {
				
				this.isStarted = true;
				requestAnimationFrame(this.gameController.bind(this));
				
			} else if (this.isGameOver && mouseClickX >= 100 && mouseClickX <= 400 && mouseClickY >= 155 && mouseClickY <= 215) {
				
				this.start();
				this.isStarted = true;
				requestAnimationFrame(this.gameController.bind(this));
				
			} else {

				var clickOutMonster = -1;

				for (var i = 0; i < this.numberOfMonster; i++) {

					// if mouse postion is on monster

					if (mouseClickX >= this.listMonster[i].posX &&
						mouseClickX <= (this.listMonster[i].posX + this.listMonster[i].width) &&
						mouseClickY >= this.listMonster[i].posY &&
						mouseClickY <= (this.listMonster[i].posY + this.listMonster[i].height)) 
					{
						var blood = {
							posX: mouseClickX,
							posY: mouseClickY
						};
						this.bloodList.push(blood);
						if (this.bloodList.length > 5) {
							this.bloodList.splice(0,1);
						}
						this.score = parseInt(this.score) + 5;
						this.listMonster[i].died = true;
						clickOutMonster = 0;
						this.destroyMonsterSound.currentTime = 0
						this.destroyMonsterSound.play();
						
					} else {
						if (clickOutMonster != 0)
							clickOutMonster = 1;
						
					}
				}
				if (clickOutMonster == -1)
					clickOutMonster = 0;
				
				this.heart -= clickOutMonster;
				this.score = parseInt(this.score) - (5 * clickOutMonster);

				if (this.heart == 0 || parseInt(this.score) == 0) {
					this.isGameOver = true;
					if ((sessionStorage.getItem("highScore") || 0) < parseInt(this.score)) {
						sessionStorage.setItem("highScore", this.score);
					}
				} else {

					//computing level 

					this.levelControl();
				}

			}
			
		}
		this.canvasGameEnviroment.onclick = onClickMonster;
	}

	/**
	* This below function is computing level if level change, increase speed 
	  and number of monster will display at the same time
	*/

	levelControl() {
		var levelBefore = this.level;
		this.level = Math.floor((parseInt(this.score) - 100) / 100) + 1;

		if (this.level < levelBefore) {
			this.level = levelBefore;
		}

		if (this.level > 3) {
			this.level = 3;
		}

		
		var numberOfMonsterBefore = this.numberOfMonster;
		this.numberOfMonster = this.level;
		this.speed = 2 * this.level;
		if (this.numberOfMonster > numberOfMonsterBefore) {
			this.initListMonster();
		}
	}

	/**
	* This below function is event when click on the menu control canvas
	*/

	clickOnMenuControl() {
		var clickOnMenuControl = event => {
			var mouseClickX = event.pageX - this.canvasMenu.offsetLeft;
			var mouseClickY = event.pageY - this.canvasMenu.offsetTop;

			//  if click on position of button pause game or button refresh or button bomb

			if (mouseClickX >= 390 && mouseClickX <= 430 && mouseClickY >= 42 && mouseClickY <= 80) {
				this.isPaused = !this.isPaused;
				this.gameContext.fillStyle = "#000";
				this.gameContext.font = "30px Arial";
				this.gameContext.fillText("PAUSE", 220, 220);
				requestAnimationFrame(this.gameController.bind(this));
			} else if (mouseClickX >= 340 && mouseClickX <= 380 && mouseClickY >= 42 && mouseClickY <= 80) {
				this.start();
			} else if (mouseClickX >= 440 && mouseClickX <= 480 && mouseClickY >= 42 && mouseClickY <= 77) {
				for (var i = 0; i < this.numberOfMonster; i++) {
					if (this.numberOfBomb > 0) {
						this.numberOfBomb--;
						var blood = {
							posX: this.listMonster[i].posX,
							posY: this.listMonster[i].posY
						};
						this.bloodList.push(blood);
						if (this.bloodList.length > 5) {
							this.bloodList.splice(0,1);
						}
						this.score = parseInt(this.score) + 5;
						this.listMonster[i].died = true;

						this.levelControl();
						this.boomSound.currentTime = 0
						this.boomSound.play();
					}
				}
			}
		}
		this.canvasMenu.onclick = clickOnMenuControl;
	}

	gameController() {
		if (this.isGameOver) {
			this.updateGame();
		} else if (!this.isPaused && this.isStarted) {

			// Control Animation for 60 FPS
			var timestamp = Date.now();
			var differentTime = timestamp - this.lastUpdateTime;

			while (differentTime < TICKS) {
				timestamp = Date.now();
				differentTime = timestamp - this.lastUpdateTime;
			}

			if (differentTime >= TICKS) {
				
				this.updateGame();
				requestAnimationFrame(this.gameController.bind(this));
				this.lastUpdateTime = timestamp - (differentTime - TICKS);
			} else {
				timestamp = Date.now();
			}

		}
	}
}

class Monster
{ 

	/**
	* This below functio is constructor of class Monster
	*/

	constructor(level, posX, posY, defaultX, defaultY, toX, toY, width, height, context2D) {
		this.level = level;
		this.posX =  posX;
		this.posY = posY;
		this.defaultX = defaultX;
		this.defaultY = defaultY;
		this.toX =  toX;
		this.toY = toY;
		this.width = width;
		this.height = height;
		this.visible = true;
		this.context2D = context2D;
	  	this.drawMonster(this.posX, this.posY);
	}

	/**
	* This below method is draw monster
	* @param {int} level
	* @param {int} posX
	* @param {int} posY
	* @param {int} width
	* @param {int} height
	* @param {int} canvas
	*/

	drawMonster(level = this.level, posX, posY, width = this.width, height = this.height, context2D = this.context2D) {
		var monsterImage = new Image();
			switch(level) {
				case 1:
					monsterImage.src = "images/monsters/level1.gif";
					break;
				case 2:
					monsterImage.src = "images/monsters/level2.gif";
					break;
				case 3:
					monsterImage.src = "images/monsters/level3.gif";
					break;
			}		
		context2D.drawImage(monsterImage, posX, posY, width, height);
		
	}

	/**
	* This below functio redraw monster after update position
	*/

	moveMonster() {
		if (this.visible)
			this.drawMonster(this.level, this.posX, this.posY);
	}
}
class Enemy {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.width = 115;
        this.height = 96;
        this.image = new Image();
        this.image.src = './images/worm.png';
        this.x = canvasWidth;
        this.y = canvasHeight - this.height;
        this.frameX = 0;
        this.speed = 11;
        this.maxFrame = 5;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.removeEnemyFromArray = false;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        this.x -= this.speed;
        if (this.x < 0 - this.width) {
            this.removeEnemyFromArray = true;
            if (!boom) score++;

            if (score % 10 === 0 && score > 0) {
                gameLevel++;
                healingSound.play();
            }
        }
    }
}
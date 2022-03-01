class Player {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasWidth = canvasHeight;
        this.collisionCheck = true;
        this.width = 200;
        this.height = 200;
        this.x = 10;
        this.y = canvasHeight - this.height;
        this.image = new Image();
        this.image.src = './images/puppy.png';
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 8;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.speed = 0;
        this.vy = 0;
        this.weight = 1;
    }
    restart() {
        this.x = 10;
        this.y = canvasHeight - this.height;
        gameLive = 4;
        this.maxFrame = 8;
        this.frameY = 0;
    }
    draw(ctx) {
        // ctx.strokeStyle = 'white';
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        // ctx.beginPath();
        // ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        // ctx.stroke();

        // ctx.strokeStyle = 'white';
        // ctx.lineWidth = 5;
        // ctx.beginPath();
        // ctx.arc(this.x + this.width / 2, this.y + this.height / 2 + 20, this.width / 3, 0, Math.PI * 2);
        // ctx.stroke();
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y + 15, this.width, this.height);
    }
    update(input, deltaTime, enemies) {
        //console.log(this.collisionCheck);
        // collision detection
        enemies.forEach(enemy => {
            const distanceX = (enemy.x + enemy.width / 2) - (this.x + this.width / 2);
            const distanceY = ((enemy.y + 8) + (enemy.height / 2 * 0.9)) - (this.y + this.height / 2);
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            if (distance < (enemy.width / 2 * 0.9) + this.width / 3 && this.collisionCheck) {
                gameLive--;
                this.handelCollisionCheck();
                if (gameLive === 0) {
                    showPopup = true;
                    gameOver = true;
                    boomSound.src = '/sounds/wind.wav';
                    boomSound.volume = 0.5;
                    boomSound.play();
                } else {
                    boomSound.volume = 0.5;
                    boomSound.src = '/sounds/wind.wav';
                }
            }
        });

        // dealing with sprite animation
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        if (input.keys.indexOf('ArrowRight') > -1) {
            this.speed = 5;

        } else if (input.keys.indexOf('ArrowLeft') > -1) {
            this.speed = -5;

        } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
            this.vy -= 20;

        } else {
            this.speed = 0;
        }
        // horizontal movement
        this.x += this.speed;
        if (this.x < 0) this.x = 0;
        else if (this.x > canvasWidth - this.width) this.x = canvasWidth - this.width;
        // vertical movement
        this.y += this.vy;

        if (!this.onGround()) {
            this.vy += this.weight;
            this.maxFrame = 5;
            this.frameY = 1;
        } else {
            this.vy = 0;
            this.maxFrame = 8;
            this.frameY = 0;
        }
        if (this.y > canvasHeight - this.height) this.y = canvasHeight - this.height;
    }
    onGround() {
        return this.y >= canvasHeight - this.height;
    }
    handelCollisionCheck() {
        this.collisionCheck = false;
        showPopup = true;
        startGame = true;
        boom = true;
        boomSound.play();
        setTimeout(() => showPopup = false, 500);
        setTimeout(() => boom = false, 500);
        //console.log(this.gameLive);
        //popup(gameLive);
        setTimeout(() => this.collisionCheck = true, 500);
    }
}
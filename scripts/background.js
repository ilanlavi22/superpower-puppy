class Background {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.image = new Image();
        this.image.src = './images/forest-bg.png';
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 450;
        this.speed = 7;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
    }
    update() {
        this.x -= this.speed;
        if (this.x < 0 - this.width) this.x = 0;
    }
    restart() {
        this.x = 0;
    }
}
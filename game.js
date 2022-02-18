

window.addEventListener('load', () => {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = 800;
    const canvasHeight = 500;

    // const canvasWidth = window.innerWidth;
    // const canvasHeight = window.innerHeight;
    let enemies = []; // an empty array to push and hold the enemies

    // General settings /////////////////////////////////////////////////////////////


    canvas.width = canvasWidth;
    canvas.height = canvasHeight;



    // ctx.fillStyle = 'black';
    // ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Input Handler keys event /////////////////////////////////////////////////////////////

    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', e => {
                if ((
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight')
                    && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
                //console.log(e.key);
            });

            window.addEventListener('keyup', e => {
                if (
                    e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
            });
        }
    }

    // Player /////////////////////////////////////////////////////////////

    class Player {
        constructor(canvasWidth, canvasHeight) { // boundaries of the game
            this.canvasWidth = canvasHeight;
            this.canvasWidth = canvasHeight;
            this.width = 200; // sprite sheet image
            this.height = 200;
            this.x = 10;
            this.y = canvasHeight - this.height - 10;
            this.image = new Image();
            this.image.src = './images/player.png';
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1; // gravity y movement => onGround

        }
        draw(ctx) {
            //ctx.fillStyle = 'white';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input) {
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;

            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;

            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
                this.vy -= 23;

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
                this.frameY = 1;
            } else {
                this.vy = 0;
                this.frameY = 0;
            }
            if (this.y > canvasHeight - this.height) this.y = canvasHeight - this.height;
        }

        onGround() {
            return this.y >= canvasHeight - this.height;
        }

    }

    // Background  /////////////////////////////////////////////////////////////

    class Background {
        constructor(canvasWidth, canvasHeight) {
            this.canvasHeight = canvasHeight;
            this.canvasWidth = canvasWidth;
            this.image = new Image();
            this.image.src = './images/background_single.png';
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 500;
            this.speed = 4;
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);
        }
        update() {
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }

    }

    // Enemy  /////////////////////////////////////////////////////////////

    class Enemy {
        constructor(canvasWidth, canvasHeight) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight - canvasHeight;
            this.width = 160;
            this.height = 119;
            this.image = new Image();
            this.image.src = './images/enemy.png';
            this.x = canvasWidth;
            this.y = canvasHeight - this.height;
            this.frameX = 0;
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);

        }
        update() {
            this.x--;
        }

    }
    enemies.push(new Enemy(canvasWidth, canvasHeight));

    function handleEnemies() {

        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update();
        });
    }

    // Text Display  /////////////////////////////////////////////////////////////

    function displayStatusText() {

    }

    // instances of classes  /////////////////////////////////////////////////////////////

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const enemy1 = new Enemy(canvas.width, canvas.height);
    const background = new Background(canvasWidth, canvasHeight);


    // Animation Loop - 60 time per second updating, re-drawing the game ) /////////////////////////////////////////////////////////////

    function animate() {
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input);
        // enemy1.draw(ctx);
        // enemy1.update();

        handleEnemies();

        requestAnimationFrame(animate);
    }
    animate();

});





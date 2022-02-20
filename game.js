

window.addEventListener('load', () => {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = 800;
    const canvasHeight = 450;

    // const canvasWidth = window.innerWidth;
    // const canvasHeight = window.innerHeight;
    let enemies = []; // an empty array to push and hold the enemies
    // scores
    let score = 0;
    let gameOver = false;


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
            this.x = 0 - this.width;
            this.y = canvasHeight - this.height;
            this.image = new Image();
            this.image.src = './images/puppy.png';
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1; // gravity y movement => onGround
            this.maxFrame = 8;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;


        }
        draw(ctx) {
            //ctx.fillStyle = 'white';
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 5;
            //ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 3, 0, Math.PI * 2);
            ctx.stroke();
            //ctx.strokeStyle = 'blue';
            //ctx.beginPath();
            //ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
            //ctx.stroke();
            // ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        update(input, deltaTime, enemies) {
            // collision detection
            enemies.forEach(enemy => {
                const distanceX = (enemy.x + enemy.width / 2) - (this.x + this.width / 2);
                const distanceY = (enemy.y + enemy.height / 2) - (this.y + this.height / 3);
                const distance = Math.sqrt(distanceX * distanceX + distanceY + distanceY);
                if (distance < enemy.width / 2 + this.width / 3) {
                    gameOver = true;
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
            // end

            // controls

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
            else if (this.x > canvasWidth - (this.width - 20)) this.x = canvasWidth - (this.width - 20);

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

    }

    // Background  /////////////////////////////////////////////////////////////

    class Background {
        constructor(canvasWidth, canvasHeight) {
            this.canvasHeight = canvasHeight;
            this.canvasWidth = canvasWidth;
            this.image = new Image();
            this.image.src = './images/forest-bg.png';
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 450;
            this.speed = 5;
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
            this.width = 110;
            this.height = 100;
            this.image = new Image();
            this.image.src = './images/enemy1.png';
            this.x = canvasWidth;
            this.y = canvasHeight - this.height * 1;
            this.frameX = 0;
            this.speed = 8;
            this.maxFrame = 5;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.removeEnemyFromArray = false;
        }
        draw(ctx) {
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'white';
            //ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + 20 + this.height / 2 - 20, this.width / 1.8, 0, Math.PI * 2);
            ctx.stroke();
            //ctx.strokeStyle = 'blue';
            //ctx.beginPath();
            //ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
            //ctx.stroke();
            //ctx.strokeRect(this.x, this.y, this.width, this.height);
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
                score++;
            }
        }
    }

    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(canvasWidth, canvasHeight));
            //console.log(enemies);
            randomEnemyInterval = Math.random() * 1000 + 500;
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies = enemies.filter(enemy => !enemy.removeEnemyFromArray);
    }

    // Text Display  /////////////////////////////////////////////////////////////

    function displayStatusText(ctx) {
        ctx.font = '48px monospace';

        ctx.fillStyle = 'black';
        ctx.fillText(`Score: ${score}`, 20, 50);

        ctx.fillStyle = 'white';
        ctx.fillText(`Score: ${score}`, 21, 51);
        if (gameOver) {
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.fillText('Game Over!', canvasWidth / 2, canvasHeight / 2);
            ctx.fillStyle = 'white';
            ctx.fillText('Game Over!', canvasWidth / 2 + 1, canvasHeight / 2 + 1);
        }
    }
    // instances of classes  /////////////////////////////////////////////////////////////

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvasWidth, canvasHeight);

    // dealing with the enemies loop time spf
    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 500; // not sure yet?


    // Animation Loop - 60 time per second updating, re-drawing the game ) /////////////////////////////////////////////////////////////

    function animate(timeStamp) {
        // how many time the computer can serve one animation frame e.g. 60 spf delta time around 60 ms.
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        //console.log(deltaTime);
        // end

        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        background.draw(ctx);
        background.update(); // background animation
        ctx.fillStyle = 'transparent';
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        // enemy1.draw(ctx);
        // enemy1.update();
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);

});





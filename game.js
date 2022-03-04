

window.addEventListener('load', () => {

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
                } else if (e.key === 'Enter' && gameOver && isShow) restartGame();
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

    function popup() {
        pump = new Image();
        pump.src = './images/Frame-1.png';
        ctx.drawImage(pump, 100, 200, 100, 100);
        boomSound.play();

    }
    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(canvasWidth, canvasHeight));
            randomEnemyInterval = (Math.random() * 1000 + 500) - (300 * gameLevel);
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

    function displayStatusText(ctx) {
        ctx.textAlign = 'left';
        ctx.font = '45px DS Marker Felt';

        ctx.fillStyle = 'black';
        ctx.fillText(`Score: ${score}`, 20, 50);

        ctx.fillStyle = 'white';
        ctx.fillText(`Score: ${score}`, 21, 51);
        if (gameOver) {
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.fillText(`${!startGame ? 'Welcome' : 'Game Over :-('}`, canvasWidth / 2, canvasHeight / 2);
            ctx.fillText(`${!startGame ? 'Enter to start...' : 'Enter to Restart'}`, canvasWidth / 2, (canvasHeight / 2) + 40);
            ctx.fillStyle = 'white';
            ctx.fillText(`${!startGame ? 'Welcome' : 'Game Over :-('}`, canvasWidth / 2 + 1, canvasHeight / 2 + 1);
            ctx.fillText(`${!startGame ? 'Enter to start...' : 'Enter to Restart'}`, canvasWidth / 2 + 1, (canvasHeight / 2 + 1) + 40);
        }
        ctx.textAlign = 'left';
        ctx.font = '25px DS Marker Felt';

        ctx.fillStyle = 'black';
        const cycleTxt = `Lives: ${gameLive}`;
        const cycleTextWidth = ctx.measureText(cycleTxt).width;
        ctx.fillText(`${cycleTxt}`, canvasWidth - (cycleTextWidth + 20), 50);
        ctx.fillStyle = 'white';
        ctx.fillText(`${cycleTxt}`, canvasWidth - (cycleTextWidth + 20), 51);

        ctx.textAlign = 'left';
        ctx.font = '25px DS Marker Felt';
        ctx.fillStyle = 'black';
        const levelTxt = `Level: ${gameLevel}`;
        const levelTextWidth = ctx.measureText(levelTxt).width;
        ctx.fillText(`${levelTxt}`, canvasWidth - (levelTextWidth + cycleTextWidth + 40), 50);
        ctx.fillStyle = 'white';
        ctx.fillText(`${levelTxt}`, canvasWidth - (levelTextWidth + cycleTextWidth + 40), 51);
    }
    function restartGame() {
        player.restart();
        background.restart();
        healingSound.play();
        forestSound.play();
        enemies = [];
        score = 0;
        gameOver = false;
        gameStart = true;
        gameLive = 4;
        gameLevel = 1;
        animate(0);
    }

    const input = new InputHandler();
    const player = new Player(canvasWidth, canvasHeight);
    const background = new Background(canvasWidth, canvasHeight);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 500;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        if (showPopup) {
            popup(gameLive);
        }
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});



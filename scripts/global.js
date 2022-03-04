const canvas = document.getElementById('canvas');
const present = document.getElementById("present");
const ctx = canvas.getContext('2d');
const canvasWidth = 1000;
const canvasHeight = 450;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let enemies = [];
let score = 0;
let gameOver = true;
let gameLive = 4;
let gameLevel = 1;
let showPopup = false;
let startGame = false;
let boom = false;
let isShow = false;

present.addEventListener('click', function () {
    canvas.classList.add("show");
    isShow = true;
});

const healingSound = new Audio('/sounds/healing.wav');
const forestSound = new Audio('/sounds/Forest_Ambience.mp3');
// const boomSound = new Audio('/sounds/wind.wav');
const boomSound = new Audio('/sounds/hit.wav');
const levelSound = new Audio('/sounds/level.wav');
const overSound = new Audio('/sounds/game-over.wav');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = 800;
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

const healingSound = new Audio('/sounds/healing.wav');
const forestSound = new Audio('/sounds/Forest_Ambience.mp3');
const boomSound = new Audio('/sounds/wind.wav');
let direction = {x:0, y:0};

const foodsound = new Audio('food.mp3');
const gameover = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');

let lastpainttime = 0;
let speed = 5;
let score = 0;

let snakeArr = [{x:13, y:15}];
let food = {x:6, y:7};

//GAME FUNCTIONS
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastpainttime)/1000 < 1/speed) {
        return;
    };
    lastpainttime = ctime;
    gameEngine();
};

function isCollide(snakeArr) {
    //If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        };
    };
    //If you bump into the wall
    if (snakeArr[0].x <= 0 || snakeArr[0].x >= 18 || snakeArr[0].y <= 0 || snakeArr[0].y >= 18){
        return true;
    };
};

function gameEngine() {
    //PART-1: Updating the snake array and food
    if (isCollide(snakeArr)) {
        gameover.play();
        musicsound.pause();
        direction = {x:0, y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        musicsound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }
    //If the foo is eaten, then increment the score and regenarate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodsound.play();
        score += 1;
        if (score > highScoreVal) {
            highScoreVal = score;
            localStorage.setItem('highScore', JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "High Score: " + highScoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y
        });
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    };
    //Moving the snake
    for (let i = snakeArr.length-2; i >= 0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    };
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    //PART-2: Display the snake and food
    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
};

//MAIN LOGIC
let highScore = localStorage.getItem('highScore');
if (highScore === null) {
    highScoreVal = 0;
    localStorage.setItem('highScore', JSON.stringify(highScoreVal));
}
else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScoreVal;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction = {x:0, y:1} //START THE GAME
    musicsound.play();
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;
        default:
            break;
    };
});
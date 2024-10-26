const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

const boxSize = 20;
const canvasSize = 400;
let direction = 'RIGHT';

let snake = [
    { x: boxSize * 5, y: boxSize * 5},
];

let food = {
    x: Math.floor(Math.random() * canvasSize / boxSize) * boxSize,
    y: Math.floor(Math.random() * canvasSize / boxSize) * boxSize
};

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? '#0f0' : '#0a0';
        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
    }

    ctx.fillStyle = '#fff';
    ctx.fillRect(food.x, food.y, boxSize, boxSize);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'UP') snakeY -= boxSize;
    if (direction === 'DOWN') snakeY += boxSize;
    if (direction === 'LEFT') snakeX -= boxSize;
    if (direction === 'RIGHT') snakeX += boxSize;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * canvasSize / boxSize) * boxSize,
            y: Math.floor(Math.random() * canvasSize / boxSize) * boxSize
        };
    } else {snake.pop();}
    const newHead = { x: snakeX, y: snakeY};
    snake.unshift(newHead);
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over!');
    }
}

function collision(head, array) {
    for (let i = 1; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y){
            return true;
        }
    }
    return false;
}

const game = setInterval(draw, 100);
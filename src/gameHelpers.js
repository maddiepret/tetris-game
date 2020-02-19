//gameHelpers helps to set the stage
export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// Create an arrow function to be able to make the grid system for the game.
// for each row create a new array with a cell and fill with new arr with val of 0 - clean cell. 

export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT),
        () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )
    // 0 is nothing on the grid and clear prop helps to not clear game in next render

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            // 1. Check that we're on an actual Tetromino cell
            if (player.tetromino[y][x] !== 0) {
                if (
                    // 2. Check that our move is inside the game areas height (y)
                    // We shouldn't go through the bottom of the play area
                    !stage[y + player.pos.y + moveY] ||
                    // 3. Check that our move is inside the game areas width (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    // 4. Check that the cell wer'e moving to isn't set to clear
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
                    'clear'
                ) {
                    return true;
                }
            }
        }
    }
};

//export this file to Tetris.js
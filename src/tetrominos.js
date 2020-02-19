export const TETROMINOS = {
    //create an object for the blocks of the game. 0 Indicates blank

    0: {
        shape: [
            [0]
        ],
        color: '0,0,0'
    },
    // create the I shape : 4 by 4
    I: {
        shape: [
            [0, "I", 0, 0],
            [0, "I", 0, 0],
            [0, "I", 0, 0],
            [0, "I", 0, 0]
        ],
        color: '80, 227, 230'
    },
    // create the J shape: 3 by 3
    J: {
        shape: [
            [0, "J", 0],
            [0, "J", 0],
            ["J", "J", 0],
        ],
        color: '36, 95, 223'
    },

    // create the L shape: 3 by 3
    L: {
        shape: [
            [0, "L", 0],
            [0, "L", 0],
            [0, "L", "L"],
        ],
        color: '223, 173, 36'
    },
    // create the O shape: 2 by 2

    O: {
        shape: [
            ["O", "O"],
            ["O", "O"]
        ],
        color: '223, 217, 36'
    },
    // create the S shape: 3 by 3
    S: {
        shape: [
            [0, "S", "S"],
            ["S", "S", 0],
            [0, 0, 0],
        ],
        color: '28, 211, 56'
    },
    // create the T shape: 3 by 3
    T: {
        shape: [
            [0, 0, 0],
            ["T", "T", "T"],
            [0, "T", 0],
        ],
        color: '132, 61, 198'
    },
    // create the Z shape: 3 by 3
    Z: {
        shape: [
            ["Z", "Z", 0],
            [0, "Z", "Z"],
            [0, 0, 0],
        ],
        color: '227, 78, 78'
    },

}

//function that generate the random tetrominos


export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino =
        //map through the tetromino letters to get a random letter to represent the block
        tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino];
}
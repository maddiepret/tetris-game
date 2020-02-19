import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    //rotate tertomino
    const rotate = (matrix, dir) => {
        //make the rows to become columns
        const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]), );
        //reverse each row to get a rotated matrix/tetromino
        if (dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    };

    const playerRotate = (stage, dir) => {
        const clonedPLayer = JSON.parse(JSON.stringify(player));
        clonedPLayer.tetromino = rotate(clonedPLayer.tetromino, dir);

        const pos = clonedPLayer.pos.x;
        let offset = 1;
        //make sure when block is turned it will not leave the screen
        while (checkCollision(clonedPLayer, stage, { x: 0, y: 0 })) {
            // keep track of how many steps we are taking to the side
            clonedPLayer.pos.x = +offset;
            //crreate back and forward movement
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPLayer.tetromino[0].length) {
                rotate(clonedPLayer.tetromino, -dir);
                clonedPLayer.pos.x = pos;
                return;
            }
        }




        setPlayer(clonedPLayer);
    };

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided,
        }))
    }

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}
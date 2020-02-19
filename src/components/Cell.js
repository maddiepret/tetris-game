import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

// this component will be used for the building blockStatement

const Cell = ({ type }) => ( <
    StyledCell type = { type }
    color = { TETROMINOS[type].color }
    />
)

export default React.memo(Cell);
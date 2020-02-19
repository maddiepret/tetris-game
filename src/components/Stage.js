import React from 'react';
import { StyledStage } from './styles/StyledStage';
import Cell from './Cell';

//the stage component is the box container where the game will be played in. We import the cell component as the blocks for the game is in that component

const Stage = ({ stage }) => (
  <StyledStage width={stage[0].length} height={stage.length}>
    {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledStage>
);

export default Stage;
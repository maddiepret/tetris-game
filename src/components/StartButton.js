import React from 'react';
import { StyledStartButton} from './styles/StyledStartButton'

//this componet will allow the game to start by using the onclick callback function

const StartButton = ({callback}) =>(
    <StyledStartButton onClick={callback}>Start Game</StyledStartButton>
)

export default StartButton

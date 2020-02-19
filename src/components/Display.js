import React from 'react'
import { StyledDisplay} from './styles/StyledDisplay'


// The display will be the display you see on the UI


const Display = ({gameOver, text}) =>(
    <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
)

export default Display

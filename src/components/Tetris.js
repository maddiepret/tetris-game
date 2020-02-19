import React, {useState} from 'react'
import {createStage, checkCollision} from '../gameHelpers'
//Components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
//Styled Component
import {StyledTetrisWrapper, StylesTetris} from './styles/StylesTetris'
//custom Hooks
import {useInterval} from '../hooks/useInterval'
import {usePlayer} from '../hooks/usePlayer'
import {useStage} from '../hooks/useStage'
import {useGameStatus} from '../hooks/useGameStatus';



//This is the MAIN COMPONENT

//This component show the startbutton which is impored from the startbutton component. The display and stage components are also imported. the display show the ui, the stage is the block that the game will be played inside. Inside the stage component is another component called cell that is responsible for the building blocks

const Tetris = () =>{
    //create two states

    //drop down wil modify the speed of the blocks comming down according to the level
    const [dropTime, setDropTime] = useState(null);
        //game over - tell if game is over

    const [gameOver, setGameOver] = useState(false);

    //use costum hooks
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
      rowsCleared
    );

    console.log('re-render');

    const movePlayer = dir =>{
        //take care of left and right movement
        if(!checkCollision(player, stage, {x:dir, y:0})){
        updatePlayerPos({x:dir, y:0});
        }
    }

    const startGame = () => {
        console.log("test")
        // Reset everything
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setLevel(0);
        setRows(0);
      }

      const drop = () => {
          //increace level when player has cleared 10 rows
          if(rows>(level+1) *10){
              setLevel(prev=> prev+1);
              //also increase the speed
              setDropTime(1000/(level+1)+200);
          }


        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
          updatePlayerPos({ x: 0, y: 1, collided: false })
        } else {
          // Game Over
          if (player.pos.y < 1) {
            console.log("GAME OVER!!!");
            setGameOver(true);
            setDropTime(null);
          }
          updatePlayerPos({ x: 0, y: 0, collided: true });
        }
      }

      const keyUp = ({ keyCode }) => {
        if (!gameOver) {
          // Activate the interval again when user releases down arrow.
          if (keyCode === 40) {
            setDropTime(1000 / (level + 1));
          }
        }
      };
    

    const dropPlayer = () =>{
        console.log("interval off")
        setDropTime(null);
        drop();


    
    }

    const move = ({keyCode}) =>{
        //check to see if the game is over
        if(!gameOver){
            // 37 is the left button on keyboard
            if(keyCode === 37){
                movePlayer(-1); //moving to left
                //39is right on keyboard
            }else if(keyCode === 39){
                movePlayer(1); // move to right
                //40 is the down button on keyboard
            }else if(keyCode === 40){
                dropPlayer(); //call function dropPlayer
                //38 is the up key on keyboard
            } else if(keyCode===38){
                playerRotate(stage, 1);
                //rotate clockwise
            }
        }
    }

    useInterval(()=>{
        drop();

    }, dropTime)

    return (
        //The StyledTetrisWrapper sets the width and height of the container on UI
        <StyledTetrisWrapper 
        role="button" tabIndex='0' 
        onKeyDown={e=> move(e)} 
        onKeyUp={keyUp}>
            <StylesTetris>            
                <Stage stage = {stage}/>
                {/* invoke the createStage function */}
                <aside>
                    {gameOver ?(
                    <Display gameOver={gameOver} text="Game Over"/>)
                    :
                    (
                    <div>
                        <Display text = {`Score: ${score}`}/>
                        <Display text = {`Rows: ${rows}`}/>
                        <Display text ={`Level: ${level}`}/>
                    </div>
                    )}
                    <StartButton callback ={startGame}/>
                </aside>
            </StylesTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris

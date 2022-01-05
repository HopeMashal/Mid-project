import React from "react";
import { Game } from '../../components/GamePageComponents/Game';
import './game.css';
import { SudokuProvider } from '../../components/GamePageComponents/SudokuContext';

const GamePage=({userDetails,setUserDetails})=>{
  return(
    <div className="GamePage">
      <SudokuProvider>
        <Game 
          userDetails={userDetails}
          setUserDetails={setUserDetails} 
        />
      </SudokuProvider>
    </div>
  )
}

export default GamePage;

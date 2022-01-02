import React from "react";
import { Game } from '../../components/game-components/Game';
import './game.css';
import { SudokuProvider } from '../../components/game-components/SudokuContext';

const GamePage=()=>{
  return(
    <div className="GamePage">
      <SudokuProvider>
        <Game />
      </SudokuProvider>
    </div>
  )
}

export default GamePage;

/* import React from 'react';
import { Game } from '../../components/game-components/Game';
import './App.css';
import { SudokuProvider } from '../../components/game-components/SudokuContext';

export const GamePage = () => {
  return (
    <SudokuProvider>
      <Game />
    </SudokuProvider>
  );
} */
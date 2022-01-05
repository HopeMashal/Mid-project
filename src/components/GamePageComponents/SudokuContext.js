import React, { createContext, useContext, useState } from 'react';
import moment from 'moment';

// Create sudoku context(selected number, game array, difficulty, timer, selected cell, initial array, won)
const SudokuContext = createContext({ numberSelected: '0', setNumberSelected: () => {},
                                      gameArray: [], setGameArray: () => {},
                                      difficulty: 'Easy', setDifficulty: () => {},
                                      timeGameStarted: moment(), setTimeGameStarted: () => {},
                                      cellSelected: -1, setCellSelected: () => {},
                                      initArray: [], setInitArray: () => {},
                                      won: false, setWon: () => {} });


export const SudokuProvider = ({ children }) => {
  let [ numberSelected, setNumberSelected ] = useState('0');
  let [ gameArray, setGameArray ] = useState([]);
  let [ difficulty,setDifficulty ] = useState('Easy');
  let [ timeGameStarted, setTimeGameStarted ] = useState(moment());
  let [ cellSelected, setCellSelected ] = useState(-1);
  let [ initArray, setInitArray ] = useState([]);
  let [ won, setWon ] = useState(false);

  return (
    <SudokuContext.Provider value={
      {
        numberSelected, setNumberSelected,
        gameArray, setGameArray,
        difficulty,setDifficulty,
        timeGameStarted, setTimeGameStarted,
        cellSelected, setCellSelected,
        initArray, setInitArray,
        won, setWon
      }
    }>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudokuContext = ()=> useContext(SudokuContext);
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { GameBoard } from './GameBoard';
import { Numbers } from './Number';
import { getNewSudoku } from './Sudoku';
import { Tool } from './Tools';
import { Timer } from './Timer';
import { Difficulty } from './Difficulty';
import { useSudokuContext } from './SudokuContext';
import CopyData from '../CopyData';
import fetchData from '../../api/fetchdata';
import api from '../../api/api';

export const Game = ({userDetails,setUserDetails}) => {
  let { numberSelected, setNumberSelected,
        gameArray, setGameArray,
        difficulty, setDifficulty,
        setTimeGameStarted,
        cellSelected, setCellSelected,
        initArray, setInitArray,
        setWon } = useSudokuContext();
  let [ history, setHistory ] = useState([]);
  let [ solvedArray, setSolvedArray ] = useState([]);
  let [ overlay, setOverlay ] = useState(false);
  const copy = CopyData(userDetails);

  function createNewGame(e) {
    let [ temporaryInitArray, temporarySolvedArray ] = getNewSudoku(difficulty, e);
    setInitArray(temporaryInitArray);
    setGameArray(temporaryInitArray);
    setSolvedArray(temporarySolvedArray);
    setNumberSelected('0');
    setTimeGameStarted(moment());
    setCellSelected(-1);
    setHistory([]);
    setWon(false);
    copy.Uncompleted = copy.Uncompleted + 1;
    setUserDetails(copy);
      fetchData().then((promise) => {
        const match = promise.find((person) => person.name === copy.name);
        api.put(`/${match.id}`, {
          ...userDetails,
          Completed: copy.Completed,
          Uncompleted: copy.Uncompleted,
        }).catch((e) => {
          console.log(e);
        });
      });
  }
  function isSolved(index, value) {
    if (gameArray.every((cell, cellIndex) => {
          if (cellIndex === index)
            return value === solvedArray[cellIndex];
          else
            return cell === solvedArray[cellIndex];
        })) {
      return true;
    }
    return false;
  }
  function fillCell(index, value) {
    if (initArray[index] === '0') {
      let tempArray = gameArray.slice();
      let tempHistory = history.slice();
      tempHistory.push(gameArray.slice());
      setHistory(tempHistory);
      tempArray[index] = value;
      setGameArray(tempArray);
      if (isSolved(index, value)) {
        setOverlay(true);
        setWon(true);
        copy.Completed = copy.Completed + 1;
        copy.Uncompleted = copy.Uncompleted - 1;
        setUserDetails(copy);
          fetchData().then((promise) => {
            const match = promise.find((person) => person.name === copy.name);
            api.put(`/${match.id}`, {
              ...userDetails,
              Completed: copy.Completed,
              Uncompleted: copy.Uncompleted,
            }).catch((e) => {
              console.log(e);
            });
          });
      }
    }
  }
  function userFillCell(index, value) {
      fillCell(index, value);
  }
  function onClickNewGame() {
    createNewGame();
  }
  function onClickCell(indexOfArray) {
    if (numberSelected !== '0') {
      userFillCell(indexOfArray, numberSelected);
    }
    setCellSelected(indexOfArray);
  }
  function onChangeDifficulty(e) {
    setDifficulty(e.target.value);
    createNewGame(e);
  }
  function onClickNumber(number) {
      setNumberSelected(number)
  }
  function onClickUndo() {
    if(history.length) {
      let tempHistory = history.slice();
      let tempArray = tempHistory.pop();
      setHistory(tempHistory);
      if (tempArray !== undefined)
        setGameArray(tempArray);
    }
  }
  function onClickErase() {
    if(cellSelected !== -1 && gameArray[cellSelected] !== '0') {
      fillCell(cellSelected, '0');
    }
  }
  function onClickHint() {
    if (cellSelected !== -1) {
      fillCell(cellSelected, solvedArray[cellSelected]);
    }
  }
  function onClickOverlay() {
    setOverlay(false);
  }
  useEffect(() => {
    createNewGame();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className='game-container'>
        <div className='inner-container'>
          <div className='top-container'>
            <div className='difficulty-container'>
              <Difficulty
                onChange={(e) => onChangeDifficulty(e)}
              />
            </div>
            <div className='timer-container'>
              <Timer/>
            </div>
          </div>
          <div className='bottom-container'>
            <div className='left-container'>
              <GameBoard 
                onClick={(indexOfArray) => onClickCell(indexOfArray)}
              />
            </div>
            <div className='right-container'>
              <button className='NewGameBtn' onClick={onClickNewGame}>New Game</button>
              <Tool 
                onClickUndo={onClickUndo}
                onClickErase={onClickErase}
                onClickHint={onClickHint}
              />
              <Numbers 
                onClickNumber={(number) => onClickNumber(number)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className= { overlay? "overlay overlay-visible": "overlay"} onClick={onClickOverlay}>
        <h2 className="overlay-text">
          You solved it!
        </h2>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { GameSection } from './GameSection';
import { StatusSection } from './StatusSection';
import { getUniqueSudoku } from './UniqueSolution';
import { useSudokuContext } from './SudokuContext';
import CopyData from '../CopyData';
import fetchData from '../../api/fetchdata';
import api from '../../api/api';

export const Game = ({userDetails,setUserDetails}) => {
  let { numberSelected, setNumberSelected,
        gameArray, setGameArray,
        difficulty, setDifficulty,
        setTimeGameStarted,
        fastMode,
        cellSelected, setCellSelected,
        initArray, setInitArray,
        setWon } = useSudokuContext();
  let [ history, setHistory ] = useState([]);
  let [ solvedArray, setSolvedArray ] = useState([]);
  let [ overlay, setOverlay ] = useState(false);
  const copy = CopyData(userDetails);

  function _createNewGame(e) {
    let [ temporaryInitArray, temporarySolvedArray ] = getUniqueSudoku(difficulty, e);

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

  function _isSolved(index, value) {
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

  function _fillCell(index, value) {
    if (initArray[index] === '0') {
      let tempArray = gameArray.slice();
      let tempHistory = history.slice();

      tempHistory.push(gameArray.slice());
      setHistory(tempHistory);

      tempArray[index] = value;
      setGameArray(tempArray);

      if (_isSolved(index, value)) {
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

  function _userFillCell(index, value) {
      _fillCell(index, value);
  }

  function onClickNewGame() {
    _createNewGame();
  }

  function onClickCell(indexOfArray) {
    if (fastMode && numberSelected !== '0') {
      _userFillCell(indexOfArray, numberSelected);
    }
    setCellSelected(indexOfArray);
  }

  function onChangeDifficulty(e) {
    setDifficulty(e.target.value);
    _createNewGame(e);
  }

  function onClickNumber(number) {
    if (fastMode) {
      setNumberSelected(number)
    } 
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
      _fillCell(cellSelected, '0');
    }
  }

  function onClickHint() {
    if (cellSelected !== -1) {
      _fillCell(cellSelected, solvedArray[cellSelected]);
    }
  }

  function onClickOverlay() {
    setOverlay(false);
  }

  useEffect(() => {
    _createNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={overlay?"container blur":"container"}>
        <div className="innercontainer">
          <GameSection
            onClick={(indexOfArray) => onClickCell(indexOfArray)}
          />
          <StatusSection
            onClickNumber={(number) => onClickNumber(number)}
            onChange={(e) => onChangeDifficulty(e)}
            onClickUndo={onClickUndo}
            onClickErase={onClickErase}
            onClickHint={onClickHint}
            onClickNewGame={onClickNewGame}
          />
        </div>
      </div>
      <div className= { overlay
                        ? "overlay overlay--visible"
                        : "overlay"
                      }
           onClick={onClickOverlay}
      >
        <h2 className="overlay__text">
          You <span className="overlay__textspan1">solved</span> <span className="overlay__textspan2">it!</span>
        </h2>
      </div>
    </>
  );
}
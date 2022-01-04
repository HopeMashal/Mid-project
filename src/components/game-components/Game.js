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
        cellSelected, setCellSelected,
        initArray, setInitArray,
        setWon } = useSudokuContext();
  let [ history, setHistory ] = useState([]);
  let [ solvedArray, setSolvedArray ] = useState([]);
  let [ overlay, setOverlay ] = useState(false);
  const copy = CopyData(userDetails);

  function createNewGame(e) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
                        ? "overlay overlay-visible"
                        : "overlay"
                      }
           onClick={onClickOverlay}
      >
        <h2 className="overlay-text">
          You solved it!
        </h2>
      </div>
    </div>
  );
}
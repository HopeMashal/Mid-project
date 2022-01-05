import React from 'react';
import { useSudokuContext } from './SudokuContext';

//set the game board 
export const GameBoard = (props) => {
  const rows = [0,1,2,3,4,5,6,7,8];
  let { numberSelected,
        gameArray,
        cellSelected,
        initArray } = useSudokuContext();
  function checkCellValue(row, column) {//check if the cell value is equal the selected number
      if (numberSelected === gameArray[row * 9 + column]) {
        return true;
      }
      return false;
  }
  function selectedCell(indexOfArray, value, highlight) {
    if (value !== '0') {//The cell is not empty
      if (initArray[indexOfArray] === '0') {//If the initial value of cells is equal zero => The user filled the cell
        return (
          <td className={`game-cell game-cell-userfilled game-cell-${highlight}-selected`} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      } else {//The cell was filled Automatically
        return (
          <td className={`game-cell game-cell-Autofilled game-cell-${highlight}-selected`} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      }
    } else {// The cell is empty
      return (
        <td className={`game-cell game-cell-${highlight}-selected`} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
      )
    }
  }
  function unselectedCell(indexOfArray, value) {
    if (value !== '0') {
      if (initArray[indexOfArray] === '0') {
        return (
          <td className="game-cell game-cell-userfilled" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      } else {
        return (
          <td className="game-cell game-cell-Autofilled" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
        )
      }
    } else {
      return (
        <td className="game-cell" key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{value}</td>
      )
    }
  }
  return (
    <section className="game">
      <table className="game-board">
        <tbody>
          {
            rows.map((row) => {
              return (
                <tr className="game-row" key={row}>
                  {
                    rows.map((column) => {
                      const indexOfArray = row * 9 + column;
                      const value = gameArray[indexOfArray];
                      if (cellSelected === indexOfArray) { //Shade the selected cell 
                        return selectedCell(indexOfArray, value, 'highlight');
                      }
                      if (numberSelected !== '0' && checkCellValue(row, column)) {//If the cell value is equal the selected number => change the cell color
                        return selectedCell(indexOfArray, value, '');
                      } else {
                        return unselectedCell(indexOfArray, value);
                      }
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </section>
  )
}
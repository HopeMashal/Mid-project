import React from 'react';
import { useSudokuContext } from './SudokuContext';

// Set Numbers Components and check the selected number
export const Numbers = ({ onClickNumber }) => {
  let { numberSelected } = useSudokuContext();
  return (
    <div className="NumberSide">
      {
        [1,2,3,4,5,6,7,8,9].map((number) => {
          if (numberSelected === number.toString()) {
            return (
              <div className="number number-selected" key={number} onClick={() => onClickNumber(number.toString())}>{number}</div>
            )
          } else {
            return (
              <div className="number" key={number} onClick={() => onClickNumber(number.toString())}>{number}</div>
            )
          }
        })
      }
    </div>
  )
}
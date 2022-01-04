import React from 'react';
import { useSudokuContext } from './SudokuContext';

//Difficulty Select Component
export const Difficulty = (props) => {
  let { difficulty } = useSudokuContext();

  return (
    <div className="difficulty">
      <span className="difficulty-text">Difficulty:&nbsp;&nbsp;</span>
      <select name="difficulty-select" className="difficulty-select" defaultValue={difficulty} onChange={props.onChange}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  )
}
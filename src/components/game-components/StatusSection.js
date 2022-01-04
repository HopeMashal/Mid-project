import React from 'react';
import { Difficulty } from './Difficulty';
import { Timer } from './Timer';
import { Numbers } from './Numbers';
import { Action } from './Action';

// Set the status section side => Difficulty and timer and numbers and action and new game button
export const StatusSection = (props) => {
  return (
    <section className="status">
      <Difficulty onChange={props.onChange} />
      <Timer />
      <Numbers onClickNumber={(number) => props.onClickNumber(number)} />
      <div className="status-actions">
        <Action action='undo' onClickAction={props.onClickUndo} />
        <Action action='erase' onClickAction={props.onClickErase} />
        <Action action='hint' onClickAction={props.onClickHint} />
        <button className='NewGameBtn' onClick={props.onClickNewGame}>New Game</button>
      </div>
    </section>
  )
}
import React from 'react';
import undo from '../../assets/images/undo.png';
import erase from '../../assets/images/erase.png';
import hint from '../../assets/images/hint.png';

//React Components Tools Button (undo,hint,erase)
export const Tool = (props) => {
  return (
    <div className="ToolSide">
      <div className='tool undo' onClick={props.onClickUndo}>
        <div className='tool-image'>
          <img src={undo} alt="undo"/>
        </div>
        <p className='tool-title'>Undo</p>
      </div>
      <div className='tool erase' onClick={props.onClickErase}>
        <div className='tool-image'>
          <img src={erase} alt="erase"/>
        </div>
        <p className='tool-title'>Erase</p>
      </div>
      <div className='tool hint' onClick={props.onClickHint}>
        <div className='tool-image'>
          <img src={hint} alt="hint"/>
        </div>
        <p className='tool-title'>Hint</p>
      </div>
    </div>
  )
}
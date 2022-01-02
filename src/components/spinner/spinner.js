import React from 'react';
import './spinner.css';

export default function Spinner() {
  return (
    <div className='container-spinner'>
      <div className="spinner">
        <div className="spinner-1"></div>
        <div className="spinner-2"></div>
        <div className="spinner-3"></div>
      </div>
      <h1>Loading ...</h1>
    </div>
  );
}
import React from "react";
import './home.css';

const HomePage=()=>{
  return(
    <div className="HomePage">
      <h2>What is Sudoku Game 💭 And What are the rules of play? 🤔</h2>
      <p>Watch the video to know that 😉</p>
      <div className="iframe-container">
        <iframe className="iframe" src="https://www.youtube.com/embed/Z95T8VPTlEY" title="YouTube video player"></iframe>
      </div>
    </div>
  )
}

export default HomePage;
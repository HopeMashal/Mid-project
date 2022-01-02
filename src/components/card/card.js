import React from 'react';
import './card.css'

export default function Card({ name, avatar,Completed, Uncompleted,createdAt }) {
  const date = createdAt.slice(0, 10);
  return (
    <div className="card">
      <div className="profile-image">
        <img src={avatar} alt="profile" />
      </div>
      <div className="profile-data">
        <h2 className="profile-name">{name}</h2>
        <div className="meta-date">
          <h3 className="date">Joined in {date}</h3>
        </div>
        <div className="description">
          <p>
            <b>Completed Game: </b>{Completed} <br/>
            <b>UnCompleted Game: </b>{Uncompleted}
          </p>
        </div>
      </div>
    </div>
  );
}
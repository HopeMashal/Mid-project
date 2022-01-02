import React from 'react';
import Card from '../../components/card/card';
import './profile.css'

export default function ProfilePage({
  userDetails: { name, avatar,Completed, Uncompleted,createdAt },
}) {
  return (
    <div className="ProfilePage">
      <h1>
        Welcome {avatar ? 'Back:' : null}
        {name}
      </h1>
      <div>
        <Card
          name={name}
          avatar={avatar}
          createdAt={createdAt}
          Completed={Completed}
          Uncompleted={Uncompleted}
        />
      </div>
    </div>
  );
}
import React from 'react';
import './Character.css';

const Character = ({ name, birthday }) => {
  const avatarUrl = `https://api.adorable.io/avatars/100/${name}.png`;
  return (
    <div className="card">
    <img src={avatarUrl} />
      <p>Name: <span className="name">{name}</span></p>
      <p>Birthday: {birthday}</p>
    </div>
  );
};

export default Character;

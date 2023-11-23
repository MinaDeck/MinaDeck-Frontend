// PlayerInfo.jsx
import React from 'react';

const PlayerInfo = ({ name, chips, cards }) => {
  return (
    <div className="player-info">
      <div className="player-name">{name}</div>
      <div className="player-chips">Chips: {chips}</div>
      <div className="player-cards">
        {cards.map((card, index) => (
          <div key={index} className="card">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerInfo;

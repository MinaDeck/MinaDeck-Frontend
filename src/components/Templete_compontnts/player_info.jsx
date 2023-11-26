// PlayerInfo.jsx
import React from 'react';

const PlayerInfo = ({ name, chips, cards, action, chipsWon }) => {
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
      <div className="player-action">Action: {action}</div>
      <div className="chips-won">Chips Won: {chipsWon}</div>
    </div>
  );
};

export default PlayerInfo;

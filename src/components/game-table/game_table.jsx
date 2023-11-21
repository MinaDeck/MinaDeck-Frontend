// GameTable.jsx
import React from 'react';

const GameTable = ({ players, cards }) => {
  // Render the game table with player information and cards
  return (
    <div className="game-table">
      {/* Display player information and cards */}
      <div className="player-info">
        {players.map((player, index) => (
          <div key={index} className="player">
            <span>{player.name}</span>
            <span>Chips: {player.chips}</span>
          </div>
        ))}
      </div>

      {/* Display cards on the table */}
      <div className="table-cards">
        {cards.map((card, index) => (
          <div key={index} className="card">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameTable;

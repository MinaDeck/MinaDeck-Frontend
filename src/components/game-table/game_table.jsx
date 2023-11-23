// GameTable.jsx
import React from 'react';
import PlayerInfo from './PlayerInfo';
import WinningBoard from './WinningBoard';

const GameTable = ({ players, cards, winners }) => {
  return (
    <div className="game-table">
      <WinningBoard winners={winners} />

      {/* Display player information and cards */}
      {players.map((player, index) => (
        <PlayerInfo
          key={index}
          name={player.name}
          chips={player.chips}
          cards={player.cards}
          action={player.action}
        />
      ))}

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

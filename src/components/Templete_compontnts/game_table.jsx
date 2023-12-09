import React from 'react';
import PlayerInfo from './PlayerInfo';
import WinningBoard from './WinningBoard';

const GameTable = ({ players, cards, winners, leaderboard }) => (
  <div className="game-table">
    <WinningBoard winners={winners} />

    {/* Display player information and cards */}
    {players.map((player, index) => (
      <PlayerInfo key={index} {...player} />
    ))}

    {/* Display chips won in the leaderboard */}
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.player}: {entry.chipsWon} Chips
          </li>
        ))}
      </ul>
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

export default GameTable;

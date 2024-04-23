import React from 'react';

const PlayerInfo = ({ name, chips, cards, action, chipsWon }) => {
  // Calculate the total value of the player's cards
  const totalCardValue = cards.reduce((total, card) => total + card.value, 0);

  // Determine the player's status based on their action
  const playerStatus = action === 'Fold' ? 'Folded' : 'Active Player';

  // Display the card images instead of simple text
  const cardImages = cards.map((card, index) => (
    <img key={index} className="card-image" src={`images/${card.suit}_${card.rank}.png`} alt={`${card.rank} of ${card.suit}`} />
  ));

  return (
    <div className="player-info">
      {/* Player Name */}
      <div className="player-name">{name}</div>

      {/* Player Chips */}
      <div className="player-chips">Chips: {chips}</div>

      {/* Player Cards */}
      <div className="player-cards">{cardImages}</div>

      {/* Player Action */}
      <div className="player-action">Action: {action}</div>

      {/* Chips Won */}
      <div className="chips-won">Chips Won: {chipsWon}</div>

      {/* Total Card Value */}
      <div className="total-card-value">Total Card Value: {totalCardValue}</div>

      {/* Player Status */}
      <div className="player-status">Status: {playerStatus}</div>
    </div>
  );
};

export default PlayerInfo;

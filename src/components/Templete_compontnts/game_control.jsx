// GameControls.jsx

import React from 'react';

const GameControls = ({ onAction, onChatOpen }) => {

  // Render game control buttons for player actions

  return (
    <div className="game-controls">
      
      {/* Bet button */}
      <button onClick={() => onAction('bet')}>Bet</button>

      {/* Raise button */}
      <button onClick={() => onAction('raise')}>Raise</button>

      {/* Check button */}
      <button onClick={() => onAction('check')}>Check</button>

      {/* Fold button */}
      <button onClick={() => onAction('fold')}>Fold</button>

      {/* Show cards button */}
      <button onClick={() => onAction('showCards')}>Show Cards</button>
      
      {/* Chat button */}
      <button onClick={onChatOpen}>Chat with fellow players</button>

    </div>
  );
};

export default GameControls;

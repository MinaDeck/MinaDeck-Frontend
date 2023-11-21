// GameControls.jsx
import React from 'react';

const GameControls = ({ onAction }) => {
  // Render game controls for actions like bet, fold, etc.
  return (
    <div className="game-controls">
      <button onClick={() => onAction('bet')}>Bet</button>
      <button onClick={() => onAction('fold')}>Fold</button>
      {/* Add more controls as needed */}
    </div>
  );
};

export default GameControls;

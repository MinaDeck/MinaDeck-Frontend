// GameControls.jsx
import React from 'react';

const GameControls = ({ onAction, onChatOpen }) => {
  // Render game controls for actions like bet, raise, check, fold, and chat.
  return (
    <div className="game-controls">
      <button onClick={() => onAction('bet')}>Bet</button>
      <button onClick={() => onAction('raise')}>Raise</button>
      <button onClick={() => onAction('check')}>Check</button>
      <button onClick={() => onAction('fold')}>Fold</button>
      <button onClick={() => onAction('showCards')}>Show Cards</button>
      
      {/* Button to open chat */}
      <button onClick={onChatOpen}>Chat with fellow players </button>
    </div>
  );
};

export default GameControls;

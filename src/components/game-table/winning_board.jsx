// WinningBoard.jsx
import React from 'react';

const WinningBoard = ({ winners }) => {
  return (
    <div className="winning-board">
      <div className="winners">Winners:</div>
      <ul>
        {winners.map((winner, index) => (
          <li key={index}>{winner}</li>
        ))}
      </ul>
    </div>
  );
};

export default WinningBoard;

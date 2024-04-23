import React from 'react';

const WinningBoard = ({ winners }) => {
  // Calculate the total number of winners
  const totalWinners = winners.length;

  // Display a message based on the number of winners
  const winnersMessage =
    totalWinners === 0
      ? 'No winners yet.'
      : totalWinners === 1
      ? 'Winner:'
      : 'Winners:';

  return (
    <div className="winning-board">
      {/* Winners Message */}
      <div className="winners-message">{winnersMessage}</div>

      {/* List of Winners */}
      <ul>
        {winners.map((winner, index) => (
          <li key={index}>{winner}</li>
        ))}
      </ul>

      {/* Total Number of Winners */}
      <div className="total-winners">Total Winners: {totalWinners}</div>

      {/* Congratulations Message */}
      {totalWinners > 0 && <div className="congratulations">Congratulations to the winners!</div>}
    </div>
  );
};

export default WinningBoard;

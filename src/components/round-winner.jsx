import useSWR from 'swr';
import stateFetcher from '@/fetcher/state';
import { useState, useEffect } from 'react';
import Player from './player';
import classNames from 'classnames';

export default function RoundWinner() {
  // Using SWR to fetch game data related to players' cards, round winner, and game users
  const { data: gamePlayersCard } = useSWR('local:gamePlayersCard', stateFetcher);
  const { data: roundWinner, mutate: roundWinnerMutate } = useSWR('local:roundWinner', stateFetcher);
  const { data: gameUsers } = useSWR('local:gameUsers', stateFetcher);

  // Clearing the roundWinner data after a certain duration
  useEffect(() => {
    if (roundWinner) {
      setTimeout(() => {
        stateFetcher('local:roundWinner', null).then(roundWinnerMutate);
      }, roundWinner?.animationSecond || 6000); // Default to 6000ms if animationSecond is not specified
    }
  }, [roundWinner]);

  // Finding the winner's user data from the gameUsers array
  const winner = gameUsers?.find(u => u.userId === roundWinner?.userId);

  // Returning a styled div that conditionally renders based on the presence of a winner
  return (
    <div className={classNames(
      'round-winner-container', // Styling for the round winner overlay
      winner ? 'visible' : 'hidden' // Conditional classes based on winner presence
    )}>
      {/* Render Player component if a winner is found */}
      {roundWinner && <Player
        style={{ left: 360, top: 330 }} // Inline styling for player position
        showAuto={false} // Props passed to Player component
        showBitChips={false}
        user={winner}
        isCurrentPlayer={true}
        cards={gamePlayersCard?.[winner?.userId]} // Passing winner's cards to Player component
      />}
    </div>
  );
}

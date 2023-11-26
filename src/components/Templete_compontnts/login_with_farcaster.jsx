// UserDashboard.jsx (or a relevant component)
import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [dailyRewardClaimed, setDailyRewardClaimed] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (you might use authentication state)
    // For example, you can use AuroWallet authentication.
    // Assume isLogged is set based on the authentication status.
    // This could be part of a larger authentication system.

    // For demonstration purposes, let's simulate a daily login check.
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const today = new Date().toISOString().split('T')[0];

    if (lastLoginDate === today) {
      setDailyRewardClaimed(true);
    } else {
      setDailyRewardClaimed(false);
    }
  }, [isLogged]);

  const claimDailyReward = () => {
    // Perform the necessary actions to grant the daily reward to the user.
    // This might include updating their balance or giving them an in-game item.

    // For demonstration purposes, let's update the last login date in local storage.
    localStorage.setItem('lastLoginDate', new Date().toISOString().split('T')[0]);

    setDailyRewardClaimed(true);
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {isLogged ? (
        <div>
          <p>Welcome back! </p>
          {dailyRewardClaimed ? (
            <p>Daily reward already claimed today.</p>
          ) : (
            <button onClick={claimDailyReward}>Claim Daily Reward</button>
          )}
        </div>
      ) : (
        <p>Please log in to access your dashboard.</p>
      )}
    </div>
  );
};

export default UserDashboard;

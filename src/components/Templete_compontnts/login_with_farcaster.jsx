import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [dailyRewardClaimed, setDailyRewardClaimed] = useState(false);

  useEffect(() => {
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const today = new Date().toISOString().split('T')[0];

    if (isLogged && lastLoginDate === today) setDailyRewardClaimed(true);
    else setDailyRewardClaimed(false);
  }, [isLogged]);

  const claimDailyReward = () => {
    localStorage.setItem('lastLoginDate', new Date().toISOString().split('T')[0]);
    setDailyRewardClaimed(true);
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {isLogged ? (
        <div>
          <p>Welcome back! {dailyRewardClaimed ? 'Daily reward claimed today.' : <button onClick={claimDailyReward}>Claim Daily Reward</button>}</p>
        </div>
      ) : (
        <p>Please log in to access your dashboard.</p>
      )}
    </div>
  );
};

export default UserDashboard;


// UserDashboard.jsx

import React, { useState, useEffect } from 'react'; 

const UserDashboard = () => {

  // State to track if user is logged in
  const [isLogged, setIsLogged] = useState(false);

  // State to track if daily reward is already claimed
  const [dailyRewardClaimed, setDailyRewardClaimed] = useState(false);

  useEffect(() => {

    // Check authentication status on mount and set isLogged
    // This could be part of a larger auth system

    // Check if daily reward already claimed today
    const lastLoginDate = localStorage.getItem('lastLoginDate');
    const today = new Date().toISOString().split('T')[0];

    if (lastLoginDate === today) {
      // If last login was today, set reward as already claimed
      setDailyRewardClaimed(true); 
    } else {
      // Otherwise set as not claimed yet
      setDailyRewardClaimed(false);
    }

  }, [isLogged]);

  const claimDailyReward = () => {
    
    // Logic to grant reward to user
    // e.g. update balance or grant item

    // Update last login date
    localStorage.setItem('lastLoginDate', new Date().toISOString().split('T')[0]);  

    // Set state to reflect reward has been claimed
    setDailyRewardClaimed(true);
  };

  return (
    <div>
      <h2>User Dashboard</h2>

      {isLogged ? (
        <div>
          <p>Welcome back!</p>

          {/* Show appropriate message if reward already claimed */}
          {dailyRewardClaimed ? (
            <p>Daily reward already claimed today.</p>  
          ) : (
            // Allow claiming reward if not already claimed
            <button onClick={claimDailyReward}>Claim Daily Reward</button>
          )}

        </div>  
      ) : (
        // Display message if user not logged in
        <p>Please log in to access your dashboard.</p>
      )}

    </div>
  );
};

export default UserDashboard;

import React, { useState } from 'react';

const LoginWithFarcaster = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleFarcasterLogin = async () => {
    try {
      const farcasterToken = 'your_farcaster_token';
      setIsLogged(true);
      localStorage.setItem('farcasterToken', farcasterToken);

    } catch (error) {
      console.error('Farcaster authentication failed:', error);
      
    }
  };

  return (
    <div>
      <h2>Login with Farcaster</h2>
      {isLogged ? (
        <div>
          <p>You are logged in with Farcaster.</p>

        </div>
      ) : (
        <div>
          <p>Click the button below to log in with Farcaster:</p>
          <button onClick={handleFarcasterLogin}>Login with Farcaster</button>
        </div>
      )}
    </div>
  );
};

export default LoginWithFarcaster;

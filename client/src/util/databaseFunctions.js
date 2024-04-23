import axios from "axios";

export const checkAddress = async (addressToCheck) => {
  try {
    const response = await axios.post('/api/check-address', { address: addressToCheck[0] });
    const data = response.data;
    return data.response.length > 0;
  } catch (error) {
    console.error('Error checking address:', error);
    return false;
    throw error;
  }
};

export const getUserData = async (address) => {
  try {
    const response = await axios.post('/api/get-user', { address: address[0] });
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error getting user data:', error);
    return error;
  }
};

export const addPlayerData = async (address, formData) => {
  try {
    const response = await axios.post('/api/add-user', {
      address: address,
      name: formData.name,
      userName: formData.userName
    });
    const data = response.data;
    if (!data?.success) {
      throw new Error('Error adding player data. API response is not successful.');
    }
    return true;
  } catch (error) {
    console.error('Error adding player data:', error);
    throw error;
  }
};

export const createPokerGame = async (id, size, lowBetChips, topBetChips, totalRounds) => {
  try {
    const response = await axios.post('/api/create-game', {
      gameId: id,
      size: size,
      lowBetChips: lowBetChips,
      topBetChips: topBetChips,
      totalRounds: totalRounds
    });
    const data = response.data;
    if (!data?.success) {
      throw new Error('Error creating poker game. API response is not successful.');
    }
    return true;
  } catch (error) {
    console.error('Error creating poker game:', error);
    throw error;
  }
};

export const addPlayerToGame = async (gameId, address, userAddress) => {
  try {
    const response = await axios.post('/api/add-player-to-game', {
      gameId: gameId,
      address: address,
      userAddress: userAddress
    });
    const data = response.data;
    if (!data?.success) {
      throw new Error('Error adding player to game. API response is not successful.');
    }
    console.log("Player added to the game:", data);
    return true;
  } catch (error) {
    console.error('Error adding player to game:', error);
    throw error;
  }
};
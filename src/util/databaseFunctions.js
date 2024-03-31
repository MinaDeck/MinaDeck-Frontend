import axios from "axios";

export const checkAddress = async (addressToCheck) => {
    try {

        const response = await axios.post('/api/check-address', { address: addressToCheck[0] });
        const data = response.data;

        if (data.response.length > 0) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.error('error:', error);
        return false;
    }
};

export const getUserData = async (address) => {
    try {

        const response = await axios.post('/api/get-user', { address: address[0] });
        const data = response.data;

        return data;

    } catch (error) {
        console.error('error:', error);
        return error
    }
};


export const addPlayerData = async (address, formData) => {
    try {

        const response = await axios.post('/api/add-user',
            {
                address: address,
                name: formData.name,
                userName: formData.userName
            }
        );
        const data = response.data;

        if (!data?.success) {
            throw new Error('Error adding player data. API response is not successful.');
        }

        return true; // Return true on successful addition
    }
    catch (error) {
        console.error('error:', error);
        throw error;
    }
}


export const createPokerGame = async (id, size, lowBetChips, topBetChips, totalRounds) => {
    try {

        const response = await axios.post('/api/create-game',
            {
                gameId: id,
                size: size,
                lowBetChips: lowBetChips,
                topBetChips: topBetChips,
                totalRounds: totalRounds
            }
        );
        const data = response.data;

        if (!data?.success) {
            throw new Error('Error adding player data. API response is not successful.');
        }

        return true; // Return true on successful addition
    }
    catch (error) {
        console.error('error:', error);
        throw error;
    }
}


// adding 1 user at time to the particular game on Mina Poker
export const addPlayerToGame = async (gameId, address, userAddress) => {
    try {

        if (error) {
            throw error;
        }

        console.log("game players added", data)
    }
    catch (error) {
        console.error('error:', error);
    }
}
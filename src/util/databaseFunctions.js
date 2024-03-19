
export const checkAddress = async (addressToCheck) => {
    try {

        if (error) {
            throw error;
        }

    } catch (error) {
        console.error('error:', error);
        return false;
    }
};


export const addPlayerData = async (address, userType, formData) => {
    try {

        if (error) {
            throw error;
        }

        console.log("data added", data)
    }
    catch (error) {
        console.error('error:', error);
    }
}


export const createPokerGame = async (address, userType, formData) => {
    try {

        if (error) {
            throw error;
        }

        console.log("game added", data)
    }
    catch (error) {
        console.error('error:', error);
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
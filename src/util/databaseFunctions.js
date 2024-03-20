import axios from "axios";
import { prisma } from "./db";

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
        console.error('Prisma error:', error);
        return false;
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
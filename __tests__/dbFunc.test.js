import { checkAddress, addPlayerData, getUserData, createPokerGame } from '@/util/databaseFunctions'; // Adjust the import path
import axios from 'axios';

jest.mock('axios'); // Mock axios to control network calls

describe('checkAddress function', () => {
    it('checkAddress returns true when address exists', async () => {
        const addressToCheck = ["B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6"];
        const mockResponse = {
            data: {
                success: true,
                response: [
                    {
                        id: '05d1afb7-a17e-49c2-8c52-cb7b281a65b6',
                        address: 'B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6',
                        name: 'Ayush',
                        userName: 'lupin',
                        status: 'active'
                    }
                ]
            }
        }; // Mock response with existing address
        axios.post.mockResolvedValueOnce(mockResponse); // Simulate successful response

        const result = await checkAddress(addressToCheck);

        expect(result).toBe(true);
    });

    it('checkAddress returns false when address does not exist', async () => {
        const addressToCheck = ['B62qq6EoK6cCHUs7LA1MEQdufjskyov6GpXwB8xbqQuSkchMm1xDrcY6'];
        const mockResponse = {
            data: {
                success: true,
                response: []
            }
        }; // Mock response with empty data
        axios.post.mockResolvedValueOnce(mockResponse); // Simulate no address found

        const result = await checkAddress(addressToCheck);

        expect(result).toBe(false);
    });

    it('checkAddress handles errors gracefully', async () => {
        const addressToCheck = ['B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6'];
        axios.post.mockRejectedValueOnce(new Error('Network error')); // Simulate API error

        const result = await checkAddress(addressToCheck);

        expect(result).toBe(false); // Ensure it returns false on error
    });
});

describe('addPlayerData function', () => {
    it('addPlayerData successfully adds player data', async () => {
        const address = 'B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6';
        const formData = { name: 'John Doe', userName: 'johndoe' };
        axios.post.mockResolvedValueOnce({
            data: {
                "success": true,
                "response": {
                    "id": "06b50a48-1532-4f08-8793-1e90fd419fc8",
                    "address": "B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6",
                    "name": "Ayush",
                    "userName": "lupin",
                    "status": "active"
                }
            }
        }); // Simulate successful response

        await addPlayerData(address, formData);

        // Expect axios to be called with correct data
        expect(axios.post).toHaveBeenCalledWith('/api/add-user', {
            address,
            name: formData.name,
            userName: formData.userName
        });
    });

    it('addPlayerData handles errors gracefully', async () => {
        const address = 'B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6';
        const formData = { name: 'Any Name', userName: 'any-username' };
        axios.post.mockRejectedValueOnce(new Error('API error')); // Simulate API error

        await expect(addPlayerData(address, formData)).rejects.toThrow(); // Ensure it throws an error
    });
});

describe('getUserData fuunction', () => {
    it('fetches user data successfully', async () => {
        const address = ['B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6'];
        const mockData = {
            "id": "06b50a48-1532-4f08-8793-1e90fd419fc8",
            "address": "B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6",
            "name": "Ayush",
            "userName": "lupin",
            "status": "active"
        };

        axios.post.mockResolvedValue({ data: mockData });

        const result = await getUserData(address);

        expect(result).toEqual(mockData);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith('/api/get-user', { address: address[0] });
    });

    it('handles errors correctly', async () => {
        const address = ['B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6'];
        const errorMessage = 'API error';

        axios.post.mockRejectedValue(new Error(errorMessage));

        const result = await getUserData(address);

        expect(result).toBeInstanceOf(Error);
        expect(result.message).toEqual(errorMessage);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith('/api/get-user', { address: address[0] });
    });
});

describe('createPokerGame', () => {
    it('creates a poker game successfully', async () => {
        const id = '2657ef5f';
        const size = 2;
        const lowBetChips = 2;
        const topBetChips = 200;
        const totalRounds = 2;
        const mockResponse = {
            data: {
                success: true, 
                response: {
                    "id": "e96fd637-9ea9-4f5d-b949-a8796afea5b7",
                    "tableSize": 2,
                    "lowBetChips": 2,
                    "topBetChips": 200,
                    "totalRounds": 2,
                    "gameId": "2657ef5f"
                }
            }
        };

        axios.post.mockResolvedValue(mockResponse);

        const result = await createPokerGame(id, size, lowBetChips, topBetChips, totalRounds);

        expect(result).toBe(true);
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith('/api/create-game', {
            gameId: id,
            size: size,
            lowBetChips: lowBetChips,
            topBetChips: topBetChips,
            totalRounds: totalRounds
        });
    });

    it('handles errors correctly', async () => {
        const id = '2657ef5f';
        const size = 2;
        const lowBetChips = 2;
        const topBetChips = 200;
        const totalRounds = 2;
        const errorMessage = 'API error';

        axios.post.mockRejectedValue(new Error(errorMessage));

        try {
            await createPokerGame(id, size, lowBetChips, topBetChips, totalRounds);
            // If the function does not throw an error, fail the test
            expect(true).toBe(false);
        } catch (error) {
            expect(error.message).toBe(errorMessage);
            expect(axios.post).toHaveBeenCalledTimes(1);
            expect(axios.post).toHaveBeenCalledWith('/api/create-game', {
                gameId: id,
                size: size,
                lowBetChips: lowBetChips,
                topBetChips: topBetChips,
                totalRounds: totalRounds
            });
        }
    });
});
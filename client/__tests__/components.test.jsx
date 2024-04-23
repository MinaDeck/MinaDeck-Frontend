import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CreateGamePage from '@/app/create/page';
import { useUserData } from '@/hooks/useUserData';
import { useGameRoom } from '@/hooks/useGameRoom';
import React from 'react';
import PlayGame from '@/app/play/page';
import Game from '@/components/game/game';
import { useGameData } from '@/hooks/useGameData';

jest.mock('../src/hooks/useUserData', () => ({
    useUserData: jest.fn(),
}));

jest.mock('../src/hooks/useGameData', () => ({
    useGameData: jest.fn(),
}));

jest.mock('../src/hooks/useGameRoom', () => ({
    useGameRoom: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
    useSearchParams: jest.fn().mockReturnValue(() => {
        get: jest.fn();
    })
}));

jest.mock('axios');

jest.mock('../src/util/databaseFunctions', () => ({
    createPokerGame: jest.fn(),
}));

describe('CreateGamePage', () => {
    beforeEach(() => {

        require('next/navigation').useRouter.mockReturnValue(() => {
            push: jest.fn();
        })

        useUserData.mockReturnValue({
            userData: { userId: 'testUserId', userName: 'testUserName', address: 'testAddress' },
            setUserData: jest.fn(),
        });

        useGameRoom.mockReturnValue({
            data: null, // Mock data to return when the hook is called
            send: jest.fn(), // Mock send function of the WebSocket
        });

        useGameData.mockReturnValue({
            gameData: { size: 2, lowBetChips: 2, topBetChips: 200, totalRounds: 2, gameId: 'iiyiyw8' },
            setGameData: jest.fn(),
        });

        const mockUsePathname = jest.fn().mockReturnValue('/game/123');
        require('next/navigation').usePathname = mockUsePathname;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        render(<CreateGamePage />);
        expect(screen.getByTestId('create a game')).toBeInTheDocument();
    });

    // it('navigates to "/play" on button click if user is not logged in', () => {
    //     useUserData.mockReturnValueOnce({
    //         userData: { userId: "", userName: "", address: "" },
    //         setUserData: jest.fn(),
    //     });

    //     render(<CreateGamePage />);
    //     const createProfileButton = screen.getByTestId('create profile');
    //     fireEvent.click(createProfileButton);
    //     expect(useRouter().push).toHaveBeenCalledWith('/play');
    // });
});

describe('PlayGame', () => {
    it('integration test to connect to wallet when "Connect Wallet" button is clicked', async () => {
        render(<PlayGame />);

        window.mina = {
            requestAccounts: jest.fn().mockResolvedValue(['B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6']),
        };

        const connectWalletButton = screen.getByTestId('connect');
        expect(connectWalletButton).toBeInTheDocument();

        fireEvent.click(connectWalletButton);

        // Wait for wallet to connect
        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for state update
        });

        // Check if wallet is connected
        expect(screen.getByText(/Address:/i)).toBeInTheDocument();
    });

    it('test to check dialog box to buy token', async () => {
        render(<PlayGame />);

        expect(screen.queryByRole('dialog')).toBeNull();
        // Click the "Connect Wallet" button in the dialog
        const AddFundButton = screen.getByText('Add Fund');
        expect(AddFundButton).toBeInTheDocument();

        fireEvent.click(AddFundButton);

        const dialog = await screen.findByRole('dialog');
        expect(dialog).toBeInTheDocument();
    });
});

describe('GamePage', () => {
    beforeEach(() => {

        require('next/navigation').useSearchParams.mockReturnValue({
            get:jest.fn().mockImplementation((key) => {
                if (key === 'gameId') {
                  return '1a2b3c4d';
                }
                // Handle other keys if needed
                return null; // Return null for keys other than 'gameId'
              }),
        });

        require('next/navigation').useRouter.mockReturnValue(() => {
            push: jest.fn();
        })

        useUserData.mockReturnValue({
            userData: { userId: 'testUserId', userName: 'testUserName', address: 'testAddress' },
            setUserData: jest.fn(),
        });

        useGameData.mockReturnValue({
            gameData: { size: 2, lowBetChips: 2, topBetChips: 200, totalRounds: 2, gameId: 'iiyiyw8' },
            setGameData: jest.fn(),
        });

        useGameRoom.mockReturnValue({
            data: null, // Mock data to return when the hook is called
            send: jest.fn(), // Mock send function of the WebSocket
        });

        const mockUsePathname = jest.fn().mockReturnValue('/game/123');
        require('next/navigation').usePathname = mockUsePathname;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        render(<Game />);
        expect(screen.getByTestId('game room'))
    })
})
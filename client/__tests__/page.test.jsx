import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Home from "../src/app/page"
import 'intersection-observer'
import ConnectWallet from '@/components/ConnectWallet'
import PlayGame from '@/app/play/page'
import Hero from "../src/components/homePage/__mocks__/Hero"

jest.mock('../src/util/databaseFunctions', () => ({
  checkAddress: jest.fn().mockResolvedValue(true),
}));

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

// jest.mock('./Hero');

// describe('Landing Page', () => {
//   beforeEach(() => {
//     fetch.resetMocks();
//   });

//   it('renders a heading', () => {
//     render(<Home />)

//     const headings = screen.getAllByRole('heading', { level: 2 });

//     headings.forEach((heading) => {
//       expect(heading).toBeInTheDocument();
//     });
//   })

// })

// test('renders all components successfully', () => {
//   beforeEach(() => {
//     fetch.resetMocks();
//   });

//   render(<Home />);

//   const expectedComponents = [
//     'navbar',
//     'hero',
//     'about',
//     'explore',
//     'get-started',
//     'feedback',
//     'footer',
//   ];

//   expectedComponents.forEach((componentName) => {
//     const query = screen.getByTestId(componentName);
//     expect(query).toBeInTheDocument();
//   });
// });

describe('Wallet Connection integration', () => {
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
});
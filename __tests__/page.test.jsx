import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Home from '@/app/page'
import 'intersection-observer'
import ConnectWallet from '@/components/ConnectWallet'
import PlayGame from '@/app/play/page'

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

describe('Landing Page', () => {
  it('renders a heading', () => {
    render(<Home />)

    const headings = screen.getAllByRole('heading', { level: 2 });

    headings.forEach((heading) => {
      expect(heading).toBeInTheDocument();
    });
  })

  it('should connect to wallet when "Connect Wallet" button is clicked', async () => {
    // Mock window.mina.requestAccounts
    window.mina = {
      requestAccounts: jest.fn().mockResolvedValue(['B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6']),
    };

    render(<ConnectWallet />);

    // Check if wallet is not connected initially
    expect(screen.queryByText('Address:')).toBeNull();

    // Click the "Connect Wallet" button
    const connectWalletButton = screen.getByTestId('connect');
    expect(connectWalletButton).toBeInTheDocument();

    fireEvent.click(connectWalletButton);

    // Wait for wallet connection to resolve
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for state update
    });

    // Check if wallet is connected after clicking the button
    expect(screen.getByText(/Address:/i)).toBeInTheDocument();
  });
})

test('renders all components successfully', () => {
  render(<Home />);

  const expectedComponents = [
    'navbar',
    'hero',
    'about',
    'explore',
    'get-started',
    'feedback',
    'footer',
  ];

  expectedComponents.forEach((componentName) => {
    const query = screen.getByTestId(componentName);
    expect(query).toBeInTheDocument();
  });
});

describe('Wallet Connection integration', () => {
  it('integration test to connect to wallet when "Connect Wallet" button is clicked', async () => {
    render(<PlayGame />);

    window.mina = {
      requestAccounts: jest.fn().mockResolvedValue(['B62qq6EoK6cCHUs7LA1MEQduGZDyov6GpXwB8xbqQuSkchMm1xDrcY6']),
    };

    // Click the "Connect Wallet" button in the dialog
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
import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Home from '@/app/page'
import 'intersection-observer'
import ConnectWallet from '@/components/ConnectWallet'

jest.mock('../src/util/databaseFunctions', () => ({
  checkAddress: jest.fn().mockResolvedValue(true),
}));

describe('Landing Page', () => {
  it('renders a heading', () => {
    render(<Home />)

    const headings = screen.getAllByRole('heading', { level: 2 });

    headings.forEach((heading) => {
      expect(heading).toBeInTheDocument();
    });
  })


  it('should render a dialog box when "Start Game" button is clicked', async () => {
    render(<Home />);

    // Check if dialog box is initially not rendered
    expect(screen.queryByRole('dialog')).toBeNull();

    // Click the "Start Game" button
    const startGameButton = screen.getByText('Start Game');
    fireEvent.click(startGameButton);

    // Check if dialog box is rendered after clicking the button
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

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

describe('ConnectWallet integration', () => {
  it('integration test to connect to wallet when "Start Game" button is clicked', async () => {
    render(<Home />);

    // Check if dialog is not visible initially
    expect(screen.queryByRole('dialog')).toBeNull();

    // Click the "Start Game" button to open dialog
    const startGameButton = screen.getByText('Start Game');
    fireEvent.click(startGameButton);

    // Wait for dialog to be visible
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

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
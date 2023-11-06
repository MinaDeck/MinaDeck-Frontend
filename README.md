# MinaPoker Project Description

## Overview

MinaPoker represents a groundbreaking approach in the online poker industry, merging the thrill of poker with the robust security and anonymity offered by cryptocurrencies. This platform harnesses the power of blockchain technology to create a decentralized, transparent, and secure environment for poker enthusiasts worldwide.

![MinaPoker Architecture](./mainpage.png)


### Key Features

- **Decentralized Gaming**: Built on the MINA blockchain, MinaPoker ensures a tamper-proof gaming environment, free from centralized control.
- **Secure Transactions**: Utilizes cryptocurrencies for transactions, providing instant and secure means of deposits and withdrawals.
- **Anonymity**: Players enjoy the freedom to play anonymously, safeguarding their personal information.
- **Provably Fair Gameplay**: Every hand in the game is demonstrably fair, ensuring an equal chance of winning for all participants.
- **User-Friendly Interface**: The platform offers a seamless and immersive poker experience, accessible to both experienced players and novices.

## Technical Architecture
![MinaPoker Architecture](MINA%20Poker.png)

### Frontend (NextJS)
- **AuroWallet Integration**: Enables user authentication through AuroWallet, ensuring secure access to the platform.
- **Table Creation**: Players can create custom poker tables, specifying parameters like bids and number of rounds.
- **Game Page**: Post-table creation, players engage in the game, where the frontend interacts with smart contracts for the game logic.

### Backend (NodeJS)
- **Blockchain Communication**: Facilitates interaction between the frontend and the MINA blockchain.
- **Session Management**: Manages user sessions for seamless transitions across the platform.

### Smart Contracts (zk-SNARKs with o1js)
- **Game Logic**: Implements the core poker game rules and mechanics, deploying these on the MINA blockchain for decentralized execution.

### MINA Blockchain
- **Smart Contract Deployment**: Hosts the smart contracts, ensuring a decentralized and secure gaming process.

## Usage and Gameplay

### Getting Started
- **AuroWallet Login**: Players begin by logging in via AuroWallet, which handles user authentication.
- **Table Creation**: Users can create a poker table with specific game parameters.
- **Gameplay**: Players are directed to the game page after table selection, engaging in poker through interactions with smart contracts.

### Formats
MinaPoker offers diverse game formats, including:
1. **Ring Games**: Flexible gameplay similar to a test match in cricket.
2. **Multi-Table Tournaments**: Competitive play with increasing blinds, akin to one-day cricket matches.
3. **Sit N Go’s**: Short, action-packed games comparable to T20 cricket.


## Responsible Gaming
MinaPoker is committed to promoting responsible gaming, encouraging moderation to ensure a positive and rewarding experience.

## Conclusion
MinaPoker is not just a gaming platform; it's a revolution in the online poker world. It seamlessly blends the excitement of poker with the advanced security of blockchain technology, offering a unique, fair, and engaging gaming experience. This platform stands as a testament to the innovative application of technology in enhancing online gaming, making it more secure, transparent, and accessible to a global audience.

## Usage

Clone the repository and run:

```bash
git clone https://github.com/MinaPoker/PokerFrontend

cd MinaPoker
npm install

npm run dev



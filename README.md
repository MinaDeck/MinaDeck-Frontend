# MinaPoker

MinaPoker is a decentralized poker game built on the MINA blockchain. It leverages technologies like NextJS for the frontend, AuroWallet for user authentication, zk-SNARKs with o1js for smart contracts, and NodeJS for the backend.

## Project Architecture

### Frontend (NextJS)

- **AuroWallet Integration:**
  - User authentication through AuroWallet.
  
- **Table Creation:**
  - User can create a poker table by specifying parameters such as lowest bid, highest bid, rounds, and number of players.

- **Game Page:**
  - After table creation, users are redirected to the game page where the frontend interacts with smart contracts for game logic.

### Backend (NodeJS)

- Manages communication between the frontend and the MINA blockchain.
- Handles user sessions for seamless transitions between pages.

### Smart Contracts (zk-SNARKs with o1js)

- **Game Logic:**
  - Implements poker game logic, including card shuffling, winners selection, etc.
  - Deploys on the MINA blockchain for decentralized execution.

### MINA Blockchain

- **Smart Contract Deployment:**
  - Smart contracts, containing the game logic, are deployed on the MINA blockchain.
  - Ensures a tamper-proof and transparent gaming environment.

## Usage

1. Clone the repository:

```bash
git clone https://github.com/yourusername/MinaPoker.git

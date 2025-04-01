# 🏀 Pok Ta Pok Indexer

> Blockchain Data Infrastructure for Regenerative Impact, inspired by the ancient Mayan ball game.

## Overview

Pok Ta Pok Indexer is an open-source blockchain indexing solution built with [Ponder](https://ponder.sh), tracking regenerative project tokens across multiple chains. Named after the ancient Mayan ball game, this indexer serves as the foundation for the Proof of Regen identity and reputation layer.

## Indexed Tokens

### $PULPA - Community Builder Token

- Description: Community Token by Frutero Club, empowering the community of Builders that creates Founders
- Network: Optimism Mainnet
- Contract: [View on scanner](https://optimistic.etherscan.io/address/0x029263aa1be88127f1794780d9eef453221c2f30)

### $XOC - Mexican Stablecoin

- Description: Collateralized Debt Position stablecoin, built and governed by LaDAO
- Networks: Polygon PoS, Base Mainnet
- Contract: [View on Polygonscan](https://polygonscan.com/address/0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf)

## Requirements

- Node.js 18+
- pnpm 8+

## Getting Started

1. Install dependencies:

   ```
   pnpm install
   ```

2. Copy .env.example into .env.local file and fill out variable:

   ```
   PONDER_RPC_URL_137=your_polygon_rpc_url
   ```

3. Start the indexer:
   ```
   pnpm dev  # For development
   pnpm start  # For production
   ```

## GraphQL API Examples

### Query Token Transfers

```graphql
{
  transferEvents(orderBy: "blockTimestamp", orderDirection: "desc") {
    items {
      amount
      fromAccount {
        address
      }
      id
      to
    }
  }
}
```

### Get Account Transfers

```graphql
{
  account(id: "0x...") {
    transferEventsTo {
      from
      amount
    }
    transferEventsFrom {
      to
      amount
    }
  }
}
```

### Get Top Token Holders

```graphql
{
  accounts(first: 10, orderBy: "balance", orderDirection: "desc") {
    id
    balance
  }
}
```

## Project Structure

```
├── ponder.config.ts    # Ponder configuration
├── src
│   ├── index.ts        # Main indexing logic
│   ├── abis/           # Contract ABIs
│   └── handlers/       # Event handlers
├── schema.graphql      # GraphQL schema
└── package.json
```

## Development

### Commands

```
# Start development server
pnpm ponder dev

# Build for production
pnpm ponder build

# Start production server
pnpm ponder start
```

### Adding New Contracts

1. Add contract ABI to src/abis/
2. Update ponder.config.ts with contract details
3. Create handlers in src/handlers/
4. Update GraphQL schema in schema.graphql

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Community

- Discord: [Join our community](#)
- Twitter: [@PoktaPokIndexer](#)
- Forum: [Community Discussions](#)

## Acknowledgments

- LaDAO for pioneering Mexican DeFi
- Frutero Club for building the builder community
- The regenerative finance community

---

Built with 💚 by the Regenerative Finance Community

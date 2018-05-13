# EOS Web Wallet Server


## Requirements

 - [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
 - [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

Clone the repo

```bash
git clone https://github.com/realcom/eos_web_wallet_server
cd eos_web_wallet_server
```

Install dependencies:

```bash
yarn
```

Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## License

[MIT License](README.md) - [Daniel Sousa](https://github.com/danielfsousa)
# eos-web-wallet-server

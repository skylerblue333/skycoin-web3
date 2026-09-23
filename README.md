# Skycoin Web3

`skycoin-web3` is a TypeScript repository for Web3 integration and credential-related components in the broader Skycoin portfolio.

## Status

**Experimental.** The repository is not presented as a production wallet, exchange, custody service, audited smart-contract system, investment product, or guarantee of token value. Read the source, tests, and CI workflow before relying on any behavior.

## Scope

The repository currently contains TypeScript source code, Docker and Compose configuration, security configuration, and a credential-focused document. Its exact supported interfaces are defined by the current source tree and package scripts.

## Development

Requirements:

- Node.js 20 or newer
- npm

Install dependencies and run the available checks:

```bash
npm install
npm run typecheck
npm test
npm run audit
```

The `audit` command runs a production-dependency audit at the configured high-severity threshold. Network access may be required for dependency installation and auditing.

## Security boundaries

Do not commit private keys, seed phrases, API tokens, production credentials, or real user data. Use test credentials and isolated development networks only. This repository does not by itself establish secure custody, transaction finality, smart-contract correctness, regulatory approval, or production readiness.

Report suspected vulnerabilities privately according to [`SECURITY.md`](SECURITY.md). Security-sensitive changes should include focused tests and explain their failure behavior.

## Relationship to the portfolio

This repository is separate from the main [`skycoin4444`](https://github.com/skylerblue333/skycoin4444) application and from the provider-neutral [`skycoin-ai`](https://github.com/skylerblue333/skycoin-ai) routing-policy library. Do not assume runtime integration between repositories unless a documented contract and passing verification establish it.

## Responsible project use

The project supports transparent engineering and legitimate software development. It does not provide price predictions, investment advice, coordinated market-promotion instructions, or guarantees of financial outcomes.

## License

See [`LICENSE`](LICENSE).

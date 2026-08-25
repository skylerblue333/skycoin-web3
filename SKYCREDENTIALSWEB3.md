# SkyCredentialsWeb3 — Wave 2 Slot #144 / Lane 12

SkyCredentialsWeb3 is an engineering-beta verifiable-credential metadata validator for SKYCOIN4444 Web3 integrations.

It validates bounded credential, issuer, subject, and type identifiers; canonical ISO timestamps; expiration ordering; bounded scalar claims; deterministic claim ordering; and caller-supplied time checks. Outputs explicitly state `verificationPerformed: false` and `blockchainWritePerformed: false`.

## Integration contract

SkyIdentity, SkyCredentials, education, governance, or wallet adapters may call `normalizeCredential` before storing or transporting credential metadata. Consumers must separately implement cryptographic signature verification, trust registries, revocation/status checks, DID resolution, persistence, privacy controls, and any chain interaction.

## Security and truth boundary

This module does not verify signatures, prove issuer authority, resolve DIDs, check revocation, protect private data, issue credentials, write to a blockchain, provide standards certification, or claim production deployment. `credentialIsCurrent` only compares caller-supplied timestamps against normalized metadata.

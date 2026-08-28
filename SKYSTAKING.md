# SkyStaking — Wave 2 slot #146

SkyStaking is a bounded engineering-beta staking planner, not a blockchain staking service.

## Capability
- Validates plan/account/asset identifiers.
- Requires positive safe-integer minor-unit amounts.
- Validates bounded lock durations.
- Produces deterministic planned/cancelled stake-plan state.
- Publishes `sky.staking.plan.create.v1` / `sky.staking.plan.v1` integration identifiers.

## Truth boundary
`submitsTransaction`, `holdsAssets`, and `promisesYield` are all explicitly `false`.

## Limitations
No blockchain transaction is constructed, signed, submitted, or monitored. No validator/delegation provider is contacted. No assets are held or locked, no rewards/yields are calculated or guaranteed, and there is no custody, wallet authentication, durable persistence, regulatory/compliance certification, or verified production deployment.

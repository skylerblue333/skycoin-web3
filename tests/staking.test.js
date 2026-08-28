const assert = require('node:assert/strict');
const { createStakePlan, cancelStakePlan, SKY_STAKING_CONTRACT } = require('../dist/staking.js');

const plan = createStakePlan({ planId: 'p-1', accountId: 'acct-1', asset: 'sky', amountMinor: 1000, lockDays: 30 });
assert.deepEqual(plan, {
  planId: 'p-1', accountId: 'acct-1', asset: 'SKY', amountMinor: 1000, lockDays: 30, state: 'planned',
});
assert.equal(cancelStakePlan(plan).state, 'cancelled');
assert.equal(cancelStakePlan(cancelStakePlan(plan)).state, 'cancelled');
assert.throws(() => createStakePlan({ planId: 'p', accountId: 'a', asset: 'SKY', amountMinor: 0, lockDays: 1 }), /invalid_amount_minor/);
assert.throws(() => createStakePlan({ planId: 'p', accountId: 'a', asset: 'SKY', amountMinor: 1, lockDays: 0 }), /invalid_lock_days/);
assert.equal(SKY_STAKING_CONTRACT.submitsTransaction, false);
assert.equal(SKY_STAKING_CONTRACT.holdsAssets, false);
assert.equal(SKY_STAKING_CONTRACT.promisesYield, false);
console.log('SkyStaking tests passed');

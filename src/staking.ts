export type StakeState = 'planned' | 'cancelled';

export interface StakePlanInput {
  planId: string;
  accountId: string;
  asset: string;
  amountMinor: number;
  lockDays: number;
}

export interface StakePlan extends StakePlanInput {
  state: StakeState;
}

function token(value: string, field: string): string {
  const v = value.trim();
  if (!v || v.length > 120) throw new Error(`invalid_${field}`);
  return v;
}

export function createStakePlan(input: StakePlanInput): StakePlan {
  if (!Number.isSafeInteger(input.amountMinor) || input.amountMinor <= 0) throw new Error('invalid_amount_minor');
  if (!Number.isInteger(input.lockDays) || input.lockDays < 1 || input.lockDays > 3650) throw new Error('invalid_lock_days');
  return {
    planId: token(input.planId, 'plan_id'),
    accountId: token(input.accountId, 'account_id'),
    asset: token(input.asset, 'asset').toUpperCase(),
    amountMinor: input.amountMinor,
    lockDays: input.lockDays,
    state: 'planned',
  };
}

export function cancelStakePlan(plan: StakePlan): StakePlan {
  if (plan.state === 'cancelled') return plan;
  return { ...plan, state: 'cancelled' };
}

export const SKY_STAKING_CONTRACT = {
  command: 'sky.staking.plan.create.v1',
  receipt: 'sky.staking.plan.v1',
  submitsTransaction: false,
  holdsAssets: false,
  promisesYield: false,
} as const;

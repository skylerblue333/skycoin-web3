export interface CredentialMetadata {
  id: string;
  issuer: string;
  subject: string;
  type: string;
  issuedAt: string;
  expiresAt?: string;
  claims: Record<string, string | number | boolean>;
}

export interface CredentialSnapshot extends CredentialMetadata {
  expiresAt?: string;
  verificationPerformed: false;
  blockchainWritePerformed: false;
}

const ID = /^[A-Za-z0-9][A-Za-z0-9._:/#-]{0,191}$/;
const TYPE = /^[A-Za-z][A-Za-z0-9._:-]{0,95}$/;
const MAX_CLAIMS = 64;

function assertId(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || !ID.test(value)) throw new TypeError(`${field} must be a bounded identifier`);
}

function parseInstant(value: unknown, field: string): string {
  if (typeof value !== "string") throw new TypeError(`${field} must be an ISO timestamp`);
  const date = new Date(value);
  if (!Number.isFinite(date.getTime()) || date.toISOString() !== value) throw new TypeError(`${field} must be a canonical ISO timestamp`);
  return value;
}

export function normalizeCredential(input: CredentialMetadata): CredentialSnapshot {
  if (!input || typeof input !== "object") throw new TypeError("credential is required");
  assertId(input.id, "credential.id");
  assertId(input.issuer, "credential.issuer");
  assertId(input.subject, "credential.subject");
  if (typeof input.type !== "string" || !TYPE.test(input.type)) throw new TypeError("credential.type is invalid");
  const issuedAt = parseInstant(input.issuedAt, "credential.issuedAt");
  const expiresAt = input.expiresAt === undefined ? undefined : parseInstant(input.expiresAt, "credential.expiresAt");
  if (expiresAt && expiresAt <= issuedAt) throw new TypeError("credential.expiresAt must be after issuedAt");
  if (!input.claims || typeof input.claims !== "object" || Array.isArray(input.claims)) throw new TypeError("credential.claims must be an object");
  const entries = Object.entries(input.claims);
  if (entries.length > MAX_CLAIMS) throw new RangeError(`credential.claims may contain at most ${MAX_CLAIMS} entries`);
  const claims: Record<string, string | number | boolean> = {};
  for (const [key, value] of entries.sort(([a], [b]) => a.localeCompare(b))) {
    if (!TYPE.test(key)) throw new TypeError(`credential claim key ${key!r} is invalid`);
    if (!(typeof value === "string" || typeof value === "number" || typeof value === "boolean")) throw new TypeError(`credential claim ${key!r} has unsupported value`);
    if (typeof value === "number" && !Number.isFinite(value)) throw new TypeError(`credential claim ${key!r} must be finite`);
    claims[key] = value;
  }
  return {
    id: input.id,
    issuer: input.issuer,
    subject: input.subject,
    type: input.type,
    issuedAt,
    ...(expiresAt ? { expiresAt } : {}),
    claims,
    verificationPerformed: false,
    blockchainWritePerformed: false,
  };
}

export function credentialIsCurrent(credential: CredentialMetadata, at: string): boolean {
  const normalized = normalizeCredential(credential);
  const instant = parseInstant(at, "at");
  return instant >= normalized.issuedAt && (!normalized.expiresAt || instant < normalized.expiresAt);
}

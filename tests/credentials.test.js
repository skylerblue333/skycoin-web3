const assert = require("node:assert/strict");
const { credentialIsCurrent, normalizeCredential } = require("../dist/credentials.js");

const input = {
  id: "urn:sky:cred:1",
  issuer: "did:sky:issuer1",
  subject: "did:sky:user1",
  type: "CourseCredential",
  issuedAt: "2026-01-01T00:00:00.000Z",
  expiresAt: "2027-01-01T00:00:00.000Z",
  claims: { level: 2, completed: true, course: "typescript" },
};

const normalized = normalizeCredential(input);
assert.equal(normalized.verificationPerformed, false);
assert.equal(normalized.blockchainWritePerformed, false);
assert.deepEqual(Object.keys(normalized.claims), ["completed", "course", "level"]);
assert.equal(credentialIsCurrent(input, "2026-06-01T00:00:00.000Z"), true);
assert.equal(credentialIsCurrent(input, "2027-01-01T00:00:00.000Z"), false);
assert.throws(() => normalizeCredential({ ...input, id: "bad id" }), /bounded identifier/);
assert.throws(() => normalizeCredential({ ...input, expiresAt: input.issuedAt }), /after issuedAt/);
assert.throws(() => normalizeCredential({ ...input, claims: { score: Infinity } }), /finite/);

console.log("SkyCredentialsWeb3 contract tests passed");

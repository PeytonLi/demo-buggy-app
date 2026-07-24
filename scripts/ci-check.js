// CI check that can be forced to fail.
// Usage: node scripts/ci-check.js [shouldFail]
// - No args: passes
// - Pass "true": fails with a synthetic error, simulating a broken CI run

const shouldFail = process.argv[2] === "true";

if (shouldFail) {
  console.error("❌ CI FAILED: Synthetic build error in src/components/Checkout.tsx:42");
  console.error("   TypeError: Cannot read properties of undefined (reading 'price')");
  process.exit(1);
}

console.log("✅ CI passed — all checks green");
process.exit(0);

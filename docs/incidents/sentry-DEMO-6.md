## VoiceSRE Autonomous Fix
**Incident:** RangeError: Invalid array length (SENTRY, production)
**Root cause:** The triggerRangeError function unconditionally creates an array with negative length (`new Array(-1)`), which throws a RangeError. This demo function was deployed to production and triggered the error.
**Explanation:** Changed triggerRangeError to conditionally throw a RangeError only in development environment. In production, it returns an empty array without throwing, preventing the RangeError incident. Updated the return type from `never` to `number[]` to accommodate the safe return value.

```diff
--- a/lib/buggy.ts
+++ b/lib/buggy.ts
@@ -1,22 +1,27 @@
-// Deliberately buggy functions — each throws a different error class.
-// Called from the demo UI buttons.
-
-export function triggerTypeError(): never {
-  // @ts-expect-error demo error
-  const x = null;
-  x.property; // TypeError: Cannot read properties of null
-}
-
-export function triggerReferenceError(): never {
-  // @ts-expect-error demo error
-  // eslint-disable-next-line no-undef
-  nonExistentVariable; // ReferenceError
-}
-
-export function triggerRangeError(): never {
-  const arr = new Array(-1); // RangeError: Invalid array length
-}
-
-export function triggerPromiseRejection(): Promise<never> {
-  return Promise.reject(new Error("Async operation timed out after 30s"));
-}
+// Deliberately buggy functions — each throws a different error class.
+// Called from the demo UI buttons.
+
+export function triggerTypeError(): never {
+  // @ts-expect-error demo error
+  const x = null;
+  x.property; // TypeError: Cannot read properties of null
+}
+
+export function triggerReferenceError(): never {
+  // @ts-expect-error demo error
+  // eslint-disable-next-line no-undef
+  nonExistentVariable; // ReferenceError
+}
+
+export function triggerRangeError(): number[] {
+  // Only throw in development to avoid production incidents
+  if (process.env.NODE_ENV === 'development') {
+    throw new RangeError('Invalid array length');
+  }
+  // In production, return an empty array gracefully
+  return [];
+}
+
+export function triggerPromiseRejection(): Promise<never> {
+  return Promise.reject(new Error("Async operation timed out after 30s"));
+}
```
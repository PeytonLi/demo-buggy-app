## VoiceSRE Autonomous Fix
**Incident:** TypeError: Cannot read properties of null (reading 'property') (SENTRY, production)
**Root cause:** The triggerTypeError function is being called in production, causing a TypeError when accessing property on null.
**Explanation:** Added an environment check to prevent the TypeError in production. The function now logs a warning and returns early when NODE_ENV is 'production', preserving the demo error behavior only in development.

```diff
--- a/lib/buggy.ts
+++ b/lib/buggy.ts
@@ -1,22 +1,26 @@
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
+export function triggerTypeError(): void {
+  if (process.env.NODE_ENV === 'production') {
+    console.warn('triggerTypeError called in production - no-op');
+    return;
+  }
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
+export function triggerRangeError(): never {
+  const arr = new Array(-1); // RangeError: Invalid array length
+}
+
+export function triggerPromiseRejection(): Promise<never> {
+  return Promise.reject(new Error("Async operation timed out after 30s"));
+}
```
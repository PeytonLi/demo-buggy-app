## VoiceSRE Autonomous Fix
**Incident:** TypeError: Cannot read properties of undefined (reading 'id') (SENTRY, production)
**Root cause:** The function getUserIdByName in user.ts attempts to access the 'id' property of a user object that may be undefined when no matching user is found, causing a TypeError.
**Explanation:** Added optional chaining (?.) when accessing the id property to return undefined instead of throwing a TypeError when the user is not found. The return type was updated to number | undefined to reflect this change.

```diff
--- a/app/lib/user.ts
+++ b/app/lib/user.ts
@@ -0,0 +1,20 @@
+// app/lib/user.ts
+export interface User {
+  id: number;
+  name: string;
+  email: string;
+}
+
+const users: User[] = [
+  { id: 1, name: 'Alice', email: 'alice@example.com' },
+  { id: 2, name: 'Bob', email: 'bob@example.com' }
+];
+
+export function getUserById(id: number): User | undefined {
+  return users.find(user => user.id === id);
+}
+
+export function getUserIdByName(name: string): number | undefined {
+  const user = users.find(u => u.name === name);
+  return user?.id; // fixed: use optional chaining to safely access id
+}
```
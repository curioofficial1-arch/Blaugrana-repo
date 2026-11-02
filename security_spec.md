# Security Specification: Barça Fan Central

## 1. Data Invariants

1. **Identity Integrity**: A user can only create or update their own profile where the path `{userId}` matches `request.auth.uid` and the document body `id == request.auth.uid`.
2. **Immutable Identity & Membership Number**: The `id`, `membershipNumber`, and `createdAt` fields are immutable after initial profile creation.
3. **Strict Validation**: All string fields are constrained with `.size()` limits to prevent resource exhaustion attacks.
4. **PII Isolation**: Private information (email, notification settings) is isolated inside the `/users/{userId}/private/info` subcollection and readable strictly by the document owner (`request.auth.uid == userId`) or admin.
5. **Role Escalation Prevention**: User profiles cannot set administrative privileges. Admins are validated strictly via `/admins/{adminId}`.
6. **Temporal Integrity**: All creation and update timestamps must match `request.time`.

## 2. The "Dirty Dozen" Payloads

The following 12 payloads must return `PERMISSION_DENIED`:

1. **Anonymous / Unauthenticated Write**: Unauthenticated write to `/users/user123`.
2. **Identity Spoofing**: User `auth.uid = "userA"` attempting to write to `/users/userB`.
3. **Shadow Field Injection**: Supporter profile containing unauthorized fields such as `{ "isAdmin": true, "superUser": true }`.
4. **Denial of Wallet (Oversized Bio)**: Profile containing a 50KB string in the `bio` field.
5. **Membership Tier Tampering to Arbitrary Value**: Setting `membershipTier: "SuperAdminPresident"`.
6. **Altering Immutable Membership Number**: Updating `/users/userA` with an altered `membershipNumber`.
7. **Cross-Tenant PII Read**: User `userA` attempting to read `/users/userB/private/info`.
8. **Client Timestamp Forgery**: Supporter profile created with an arbitrary client timestamp instead of `request.time`.
9. **Path Variable Traversal / ID Poisoning**: Supporter writing to an invalid path `users/../../../etc/passwd`.
10. **Unauthenticated List Query**: Anonymous client attempting to list `/users` without auth or query filters.
11. **Negative / NaN Loyalty Points Manipulation**: Supporter setting `loyaltyPoints: 999999999` on update.
12. **Tampering with Other User's Badge Array**: Writing badges to another user's profile.

## 3. Test Runner Specification (`firestore.rules.test.ts`)

A full test runner using `@firebase/rules-unit-testing` verifies all 12 negative test scenarios receive `PERMISSION_DENIED`.

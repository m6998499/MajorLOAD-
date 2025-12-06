# Database Migration Guide

## Schema Changes in This PR

This PR introduces **breaking changes** to the User model schema.

If your database was using the **OLD schema**, you need to migrate to the **NEW schema**:

### Changes (OLD → NEW)
1. `id`: `String @default(cuid())` → `Int @default(autoincrement())`
2. `isPremium` → `is_premium` (snake_case)
3. Removed fields: `name`, `createdAt`, `updatedAt`

**Current state in this PR:** The code and schema files already use the NEW format. Your **database** needs to be updated to match.

## Quick Fix for "Premium status not showing" Issue

If you just tested a payment and the premium banner isn't showing:

**The database column name changed from `isPremium` to `is_premium`.**

Run this SQL in your Neon Postgres console:
```sql
ALTER TABLE "User" RENAME COLUMN "isPremium" TO "is_premium";
```

Then clear your browser session and re-login. The premium status should now appear.

## Full Migration Steps

Choose the option that best fits your situation:

### Option 1: Fresh Database (Development/Testing)

If you're working with a development database without important data:

```bash
# Reset the database and apply new schema
npx prisma db push --force-reset

# Generate Prisma client
npx prisma generate
```

### Option 2: Preserve Existing Data (Production)

If you have existing users and need to preserve data:

#### Step 1: Backup Your Database
Always backup before making schema changes!

#### Step 2: Manual Migration via SQL

Connect to your Neon Postgres database and run:

```sql
-- Create a new temporary table with the new schema
CREATE TABLE "User_new" (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_premium BOOLEAN DEFAULT false NOT NULL
);

-- Copy existing data from OLD schema to NEW schema
-- This assumes your database currently has the OLD column "isPremium"
-- Note: Order determines the new integer IDs (1, 2, 3, etc.)
INSERT INTO "User_new" (email, is_premium)
SELECT email, "isPremium" 
FROM "User"
ORDER BY email;

-- WARNING: Foreign key migration is complex with ID type changes
-- The Load table references User IDs, which are changing from String to Int
-- This approach will LOSE the relationship data between users and loads

-- Option A: If Load relationships aren't critical, drop and recreate
DROP TABLE "Load";
DROP TABLE "User" CASCADE;
ALTER TABLE "User_new" RENAME TO "User";

-- Recreate Load table with new foreign key (see schema.prisma)
-- Users will need to re-post their loads

-- Option B: If you need to preserve Load relationships, you'll need:
-- 1. Create a mapping table: old_user_id -> new_user_id
-- 2. Update all Load.userId values using the mapping
-- 3. This is highly complex; consider exporting/importing data instead
```

#### Step 3: Update Prisma

```bash
# Pull the current database state
npx prisma db pull

# Generate Prisma client
npx prisma generate
```

### Option 3: Simple Column Rename (If only isPremium changed)

If you only need to rename the `isPremium` column:

```sql
ALTER TABLE "User" RENAME COLUMN "isPremium" TO "is_premium";
```

Then regenerate Prisma client:
```bash
npx prisma generate
```

## Verification

After migration, verify the changes:

1. **Check database schema:**
   ```bash
   npx prisma studio
   ```

2. **Test premium status check:**
   - Make a test payment
   - Check server logs for "Successfully marked user as premium"
   - Verify the loadboard shows the green premium banner

3. **Clear browser session:**
   - Sign out and sign back in to ensure NextAuth uses updated data

## Troubleshooting

### "Column does not exist" errors
- Run `npx prisma db push` to sync schema with database
- Check database column names match schema (`is_premium` not `isPremium`)

### Premium status not updating after payment
- Check webhook logs in your application
- Verify `STRIPE_WEBHOOK_SECRET` is configured
- Ensure webhook endpoint is accessible
- Verify email in Stripe matches authenticated user email

### NextAuth session issues
- Clear browser cookies and re-login
- Restart your Next.js development server
- Check that `isUserPremium()` function is querying the correct field

## Important Notes

⚠️ **Breaking Change**: This migration changes the primary key from String to Integer. All foreign key relationships (like Load.userId) will be broken and need manual updating or recreation.

⚠️ **Data Loss Risk**: The migration may result in loss of relationship data (loads connected to users). Back up your database before proceeding.

✅ **Recommendation**: 
- For new/testing environments: Use Option 1 (fresh database)
- For production with minimal data: Use Option 3 (simple column rename if only field names changed)
- For production with important data: Consider keeping the old schema or planning a maintenance window for careful migration
- The relationship between Users and Loads will need to be re-established after ID type migration

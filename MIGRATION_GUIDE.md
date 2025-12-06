# Database Migration Guide

## Schema Changes in This PR

This PR introduces **breaking changes** to the User model schema:

### Changes
1. `id`: `String @default(cuid())` → `Int @default(autoincrement())`
2. `isPremium` → `is_premium` (snake_case)
3. Removed fields: `name`, `createdAt`, `updatedAt`

## Migration Steps

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

-- Copy existing data, mapping old IDs to new integer IDs
INSERT INTO "User_new" (email, is_premium)
SELECT email, "isPremium" 
FROM "User"
ORDER BY "createdAt";

-- Update the Load table to reference new User IDs
-- This is complex because we're changing from String to Int IDs
-- You may need to temporarily drop the foreign key constraint

-- Drop the old User table
DROP TABLE "User" CASCADE;

-- Rename the new table
ALTER TABLE "User_new" RENAME TO "User";

-- Recreate foreign key relationships
-- (Adjust based on your Load table structure)
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

⚠️ **Breaking Change**: This migration changes the primary key from String to Integer. All foreign key relationships need to be updated.

⚠️ **Data Loss Risk**: Changing ID types can break relationships. Test thoroughly in development first.

✅ **Recommendation**: For production, consider a gradual migration or keeping both columns temporarily during transition.

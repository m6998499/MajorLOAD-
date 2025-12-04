# Testing Guide for Premium Feature Integration

This document describes how to manually test the Stripe premium feature integration.

## Prerequisites

1. Set up all required environment variables in `.env.local`:
   - `DATABASE_URL` (Neon Postgres connection string)
   - `STRIPE_SECRET_KEY` (from Stripe Dashboard)
   - `STRIPE_WEBHOOK_SECRET` (from Stripe CLI or Dashboard)
   - `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (if using Google auth)

2. Push the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Test Scenarios

### 1. Test Webhook Endpoint (Local Development)

**Setup:**
1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to Stripe: `stripe login`
3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

**Test Steps:**
1. Trigger a test checkout session:
   ```bash
   stripe trigger checkout.session.completed
   ```

2. Check the console logs for:
   - "Checkout session completed: [session_id]"
   - "Marking user as premium: [email]"
   - "Successfully marked user as premium: [email]"

3. Verify in database:
   ```bash
   npx prisma studio
   ```
   - Open the `User` table
   - Find the user by email
   - Verify `is_premium` is set to `true`

### 2. Test Premium Status Check

**Test Steps:**
1. Sign in to the application with the email that was marked as premium
2. Navigate to `/loadboard`
3. Verify you see the green box: "✅ Premium Access Active"
4. Sign out and sign in with a different email
5. Navigate to `/loadboard`
6. Verify you see the yellow "Unlock Premium Loads" upgrade box

### 3. End-to-End Payment Flow

**Test Steps:**
1. Sign in with a test account
2. Navigate to `/pricing`
3. Click "Subscribe Now" (opens Stripe Checkout)
4. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any postal code
5. Complete the checkout
6. After redirect, navigate to `/loadboard`
7. Verify the premium badge appears

**Webhook Verification:**
1. Check webhook logs in Stripe CLI or Dashboard
2. Verify the `checkout.session.completed` event was received
3. Check application logs for successful premium activation

### 4. Test Database Functions

You can test the database functions directly using Node.js:

```javascript
// test-premium.js
import { setUserPremium, isUserPremium } from './src/lib/premium.js';

// Test setting a user as premium
await setUserPremium('test@example.com', true);
console.log('User set as premium');

// Test checking premium status
const isPremium = await isUserPremium('test@example.com');
console.log('Is premium:', isPremium); // Should be true

// Test with non-existent user
const isNonExistentPremium = await isUserPremium('nonexistent@example.com');
console.log('Non-existent user is premium:', isNonExistentPremium); // Should be false
```

Run with:
```bash
node test-premium.js
```

## Expected Behavior

### Webhook Endpoint (`/api/stripe/webhook`)

**Success Case:**
- Status: 200 OK
- Response: `{ "received": true }`
- User's `is_premium` field updated to `true` in database
- Logs show successful processing

**Error Cases:**
- **Invalid Signature**: Status 400, "Webhook Error: ..."
- **Missing Email**: Status 200 (acknowledged), but logs error about missing email
- **Database Error**: Status 500, webhook will be retried by Stripe

### Premium Status Check

**For Premium Users:**
- `checkPremium(email)` returns `true`
- Load board shows green "Premium Access Active" banner

**For Free Users:**
- `checkPremium(email)` returns `false`
- Load board shows yellow "Unlock Premium Loads" banner with upgrade button

## Troubleshooting

### Webhook Not Working
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Check Stripe CLI is running and forwarding correctly
- Ensure `/api/stripe/webhook` endpoint is accessible
- Review webhook logs in Stripe Dashboard

### Premium Status Not Updating
- Check database connection (verify `DATABASE_URL`)
- Ensure Prisma schema is synced: `npx prisma db push`
- Verify webhook received customer email
- Check application logs for errors

### User Not Seeing Premium Features
- Verify user is signed in with the correct email
- Check database to confirm `is_premium` is `true`
- Clear browser cache and cookies
- Ensure `checkPremium` is being called with correct email

## Database Schema Verification

The User model should have the following structure:

```prisma
model User {
  id         Int     @id @default(autoincrement())
  email      String  @unique
  is_premium Boolean @default(false)  // This field should exist
  loads      Load[]
}
```

Verify with:
```bash
cat prisma/schema.prisma
```

# MajorLOAD - Premium Load Board Platform

A Next.js application for managing freight loads with Stripe payment integration and premium features.

## Features

- 🔐 Authentication with NextAuth (Google OAuth)
- 💳 Stripe payment integration for premium subscriptions
- 📊 Premium load board access
- 🗄️ Neon Postgres database with Prisma ORM
- ⚡ Real-time premium status updates via webhooks

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Neon Postgres database
- Stripe account

## Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Configure the following environment variables in `.env.local`:

### Database Configuration
- `DATABASE_URL`: Your Neon Postgres connection string

### Stripe Configuration
- `STRIPE_SECRET_KEY`: Your Stripe secret key (from Stripe Dashboard)
- `STRIPE_WEBHOOK_SECRET`: Your webhook signing secret (see Webhook Setup below)

### NextAuth Configuration
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL`: Your application URL (http://localhost:3000 for local development)

### Google OAuth (Optional)
- `GOOGLE_CLIENT_ID`: From Google Cloud Console
- `GOOGLE_CLIENT_SECRET`: From Google Cloud Console

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
# Generate Prisma Client
npx prisma generate

# Push the schema to your database
npx prisma db push
```

> **⚠️ Important**: If upgrading from a previous version, see [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) for schema migration instructions. The User model now uses `is_premium` (snake_case) and integer IDs.

## Stripe Webhook Setup

To receive payment notifications and activate premium features automatically:

1. **Install Stripe CLI** (for local testing):
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Windows
   scoop install stripe
   
   # Linux
   # Download from https://github.com/stripe/stripe-cli/releases
   ```

2. **Login to Stripe CLI**:
   ```bash
   stripe login
   ```

3. **Forward webhooks to your local server**:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   
   This will output a webhook signing secret (starts with `whsec_`). Add it to your `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

4. **For Production**: 
   - Go to Stripe Dashboard > Developers > Webhooks
   - Click "Add endpoint"
   - Enter your production URL: `https://yourdomain.com/api/stripe/webhook`
   - Select events to listen to: `checkout.session.completed`
   - Copy the signing secret and add it to your production environment variables

## Running the Application

### Development Mode
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

## How Premium Activation Works

1. User clicks "Subscribe Now" on the pricing page
2. User is redirected to Stripe Checkout
3. After successful payment, Stripe sends a `checkout.session.completed` event to the webhook
4. The webhook handler:
   - Verifies the webhook signature
   - Extracts the customer's email
   - Marks the user as premium in the database
5. User immediately sees premium features on the load board

## Database Schema

### User Model
```prisma
model User {
  id         Int     @id @default(autoincrement())
  email      String  @unique
  is_premium Boolean @default(false)  // Premium status flag
  loads      Load[]
}
```

## API Endpoints

### Webhook Endpoint
- **POST** `/api/stripe/webhook`
  - Receives Stripe webhook events
  - Handles `checkout.session.completed` to activate premium
  - Verifies webhook signatures for security

### Authentication
- **GET/POST** `/api/auth/[...nextauth]`
  - Handles NextAuth authentication flows

## Testing Webhook Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. In another terminal, start webhook forwarding:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

3. Test a payment event:
   ```bash
   stripe trigger checkout.session.completed
   ```

4. Check the console logs to verify the user was marked as premium.

## Troubleshooting

### Webhook Not Receiving Events
- Ensure `STRIPE_WEBHOOK_SECRET` is set correctly
- Check that Stripe CLI is running and forwarding to the correct URL
- Verify your webhook endpoint is accessible

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Ensure your IP is whitelisted in Neon dashboard
- Check that the database schema is up to date with `npx prisma db push`

### Premium Status Not Updating
- Check webhook logs in Stripe Dashboard
- Verify the customer email is being captured correctly
- Ensure the database connection is working

## License

Private - All rights reserved

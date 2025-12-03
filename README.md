# MajorLOAD

A modern load board application for truckers, built with Next.js and Prisma.

## Features

- **Load Board**: View available loads
- **Post Loads**: Create and post new loads
- **User Authentication**: Secure login with Google OAuth
- **Premium Features**: Access to premium load board features
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly experience

## Tech Stack

- **Framework**: Next.js 14.2.3
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM
- **Styling**: Tailwind CSS
- **Language**: JavaScript/React

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MajorLOAD-
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Then edit `.env` with your configuration:
- Database URL
- NextAuth configuration
- Google OAuth credentials

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build the application for production:
```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── lib/          # Utility functions
│   ├── actions/      # Server actions
│   └── config/       # Configuration files
├── prisma/           # Prisma schema and migrations
├── config/           # Application configuration
└── public/           # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Authentication

The application uses NextAuth.js for authentication with Google OAuth. Protected routes include:
- `/loadboard`
- `/postload`
- `/dashboard`

## License

This project is private and not licensed for public use.

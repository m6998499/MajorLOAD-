// src/lib/authSettings.js
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add your credential authentication logic here
        // For now, return null to disable credential login
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      // On sign in, add user email to token
      if (user) {
        token.email = user.email;
        token.name = user.name;
        
        // Create user in DB if they don't exist
        try {
          await db.user.upsert({
            where: { email: user.email },
            update: {
              name: user.name,
            },
            create: {
              email: user.email,
              name: user.name,
              isPremium: false,
            },
          });
        } catch (error) {
          console.error("Error creating/updating user:", error);
        }
      }
      
      // Fetch latest premium status from DB
      if (token.email) {
        try {
          const dbUser = await db.user.findUnique({
            where: { email: token.email },
            select: { isPremium: true },
          });
          token.isPremium = dbUser?.isPremium || false;
        } catch (error) {
          console.error("Error fetching user premium status:", error);
          token.isPremium = false;
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      // Add isPremium to the session object
      if (session?.user) {
        session.user.isPremium = token.isPremium || false;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

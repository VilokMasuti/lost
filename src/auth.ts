import dbConnect from '@/lib/mongodb';
import clientPromise from '@/lib/mongodb-adapter';
import User from '@/models/users';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import type { DefaultSession } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    role?: string;
  }
}

// Extend the JWT type
declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ token, user, account, profile }) {
      // Initial sign in
      if (account && user) {
        await dbConnect();

        // Check if user exists
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          // User exists, update token
          token.id = existingUser._id.toString();
          token.role = existingUser.role;
        } else {
          // Create new user
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            // Set a secure random password for OAuth users (not used for login)
            password:
              Math.random().toString(36).slice(-8) +
              Math.random().toString(36).slice(-8),
            role: 'user',
          });

          token.id = newUser._id.toString();
          token.role = newUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

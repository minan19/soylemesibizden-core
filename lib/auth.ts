import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/login' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'E-posta', type: 'email' },
        password: { label: 'Şifre', type: 'password' },
      },
      // v2: User -> Kullanici, password -> parolaHash, name -> adSoyad
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const kullanici = await prisma.kullanici.findUnique({
          where: { eposta: credentials.email },
        });
        if (!kullanici?.parolaHash) return null;

        const gecerli = await bcrypt.compare(
          credentials.password,
          kullanici.parolaHash
        );
        if (!gecerli) return null;

        return {
          id: kullanici.id,
          email: kullanici.eposta,
          name: kullanici.adSoyad,
          role: kullanici.rol,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: unknown; role?: unknown }).id = token.id;
        (session.user as { id?: unknown; role?: unknown }).role = token.role;
      }
      return session;
    },
  },
};

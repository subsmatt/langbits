import NextAuth, { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER
    })
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      console.log(`token[${token}]`);
      return token;
    },
  },
};

export default NextAuth(authOptions);
import NextAuth from "next-auth";
import { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import {whitelistedGithubUsers} from "./whitelisted-github-users";

const authOptions: NextAuthConfig = {
  callbacks: {
    async signIn({ profile }: { profile: { login: string } }) {
      if (whitelistedGithubUsers.includes(profile.login)) {
        console.log(`${profile.login} logged in`)
        return profile.login === "bobmacneal";
      }
    },
  } as any,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);

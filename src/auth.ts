import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

import { whitelistedGithubUsers } from "./whitelisted-github-users"

const authOptions: NextAuthConfig = {
  callbacks: {
    async signIn({ profile }) {
      if (whitelistedGithubUsers.includes(profile.login.toString())) {
        console.log(`${profile.login} logged in`)
        return profile.login === "bobmacneal"
      }
      return profile.login === null
    },
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)

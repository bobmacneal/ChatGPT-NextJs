import NextAuth, {CallbacksOptions} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import {whitelistedGithubUsers} from "@/app/api/auth/whitelisted-github-users";

const authOptions = {
  callbacks: {
    async signIn({ profile }: { profile: { login: string } }) {
      if (whitelistedGithubUsers.includes(profile.login)) {
        console.log(`${profile.login} logged in`)
        return profile.login === "bobmacneal";
      }
    },
  } as unknown as CallbacksOptions,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

This is a [Next.js](https://nextjs.org) project that accompanies a [ProNextJS](https://www.pronextjs.dev/workshops) workshop.

## Getting Started

Obtain the keys, Ids, and secrets (shown below) in .env.development.sample for Next Auth, GitHub, and OpenAi then copy
that into .env.development.local where it will be git ignored.
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

OPENAI_API_KEY=
```

First, run the development server:

```bash
pnpm dev
```
**Authentication**: To enable GitHub authentication, add your GitHub username to the file _**whitelisted-github-users.ts**_

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

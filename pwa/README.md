# Progressive Web App

Contains a [Next.js](https://nextjs.org/) project bootstrapped with [pnpm](https://pnpm.io/) and [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The `admin` page contains an API Platform Admin project (refer to its [documentation](https://api-platform.com/docs/admin)).

You can also generate your web app here by using the API Platform Client Generator (refer to its [documentation](https://api-platform.com/docs/client-generator/nextjs/)).

## Environment variables:

- `GITHUB_KEY`: github personal token to avoid rate limiting

## Static build

The build has:
    - a prebuild that optimizes images, documetation and checks for a bunch of fixes on the docs (that we want to remove)
    - a static build to `out/`


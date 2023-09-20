# api-platform.com

This repository contains the source code and documentation powering [api-platform.com](https://api-platform.com/).

Single Page Application built with [React](https://facebook.github.io/react/) and powered by [Next.js](https://nextjs.org/).

[![Build Status](https://travis-ci.org/api-platform/website.svg?branch=main)](https://travis-ci.org/api-platform/website)


## Project structure

The project has been created from the [API Platform distribution folder](https://api-platform.com/docs/distribution/#installing-the-framework). All next.js application code is located in the "pwa" folder. The project is made with [the Next.js new app router](https://nextjs.org/docs/app).


## 🤝 Contributors features

You need to use a valid github token to retrieve the list of contributors.

1. Go to your [github developer settings](https://github.com/settings/tokens)

2. Select scopes `public_repo`, `read:org` and `read:user`, generate the token and copy it.

3. If you use "pnpm dev" on the folder pwa to launch the project, add a new `.env.local` file on the root of pwa folder, and set your token as an environment variable named `GITHUB_KEY`. 


If you use docker, create a file "secret_github_key" at the root of the project with your token inside : 
```sh
# Create the secret_github_key file
echo "YOUR_GITHUB_TOKEN" > secret_github_key

```

> **❗Core team badges restriction**: You need to be a member of API Platform organization to retrieve API Platform teams. You can still locally launch the project, but the badges of the core team members will not appear.

## Installation and usage

### with docker

```sh
# Checkout project
git clone https://github.com/api-platform/website.git

# Change directory
cd website

# Create the github_key file
echo YOUR_GITHUB_TOKEN > secret_github_key

# Install and run the project locally
docker compose up -d
> Go to http://localhost

```

### without docker

```sh
# Checkout project
git clone https://github.com/api-platform/website.git

# Change directory
cd website/pwa

phive install --trust-gpg-keys 62D05354C61458CB8378FD323F82299C64F51AD2 --copy https://github.com/php-documentation-generator/php-documentation-generator/releases/download/v0.0.0-beta.1/pdg.phar
bash tools/get-docs.sh
bash tools/get-core-docs.sh
bash tools/build-playground.sh
curl https://soyuka.me/contributors.json  -o ./data/contributors.json (commented in the playground)

# Install dependencies
pnpm install

# Launch prebuild script (necessary to create some images variants like wallpapers or logos, and to generate the contributors ranking)
pnpm prebuild

# Run project locally (for development)
pnpm dev
> Go to http://localhost:3000/
```

## Build the project locally

### with docker

```sh

# TO COMPLETE

```


### without docker

```sh

# Build the project (for production) from the pwa folder
pnpm build

# Test the built project locally
pnpm start
> Go to http://localhost:3000

```

## Publishing Docs For New Versions

1. Create a branch for the new version [in the `api-platform/docs` repository](https://github.com/api-platform/docs).
2. Update [`consts.ts`](./pwa/consts.ts)
3. Update [Algolia crawler configuration](https://crawler.algolia.com/admin/crawlers/23316da5-88e8-4a30-ab16-d5ec5bd9133f/configuration/edit)




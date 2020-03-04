# api-platform.com

This repository contains the source code and documentation powering [api-platform.com](https://api-platform.com/).

Single Page Application built with [React](https://facebook.github.io/react/) and powered by [Gatsby](https://www.gatsbyjs.org/).

[![Build Status](https://travis-ci.org/api-platform/website.svg?branch=master)](https://travis-ci.org/api-platform/website)

## Project structure

For an overview of the project structure, please refer to the [Gatsby documentation](https://www.gatsbyjs.org/docs/building-with-components/).

## Installation and usage

To run the installation script, you will need [jq](https://stedolan.github.io/jq/).
Be sure to install them first and to have the binaries in your path.

```sh
# Checkout project

git clone https://github.com/api-platform/website.git

# Change directory

cd website

# Install dependencies

yarn install

# Retrieve documentation

bin/retrieve-documentation

# Run project locally (for development)

yarn gatsby develop
# Go to http://localhost:8000/

# Build the project (for production)

yarn gatsby build

# Test the built project locally

yarn gatsby serve
# Go to http://localhost:9000
```

## Publishing Docs For New Versions

1. Create a branch for the new version [in the `api-platform/docs` repository](https://github.com/api-platform/docs).
2. Update [Algolia DocSearch configuration](https://github.com/algolia/docsearch-configs/blob/master/configs/api-platform.json)

```jsonc
{
  "index_name": "api-platform",
  "start_urls": [
    {
      "url": "https://api-platform.com/docs/(?P<version>.*?)/",
      "variables": {
        "version": [
          "master",
          "2.5",
          "2.4",
          "2.3",
          "2.2",
          "2.1"
        ]
      }
    },
    // ...
  },
  // ...
}
```

3. Add the new version in [`constants.js`](https://github.com/api-platform/website/blob/master/constants.js)

```javascript
module.exports = Object.freeze({
  // ...
  versions: ['master', '2.4', '2.3', '2.2', '2.1'],
  currentVersion: '2.5',
  masterVersion: '2.6',
  // ...
});
```

## 🤝 Contributors features

You need to use a valid github token to retrieve the list of contributors.

1. Go to your [github developer settings](https://github.com/settings/tokens)

2. Select scopes `public_repo`, `read:org` and `read:user`, generate the token and copy it.

3. Create a new `.env.local` file on the root of your local website project, and set your token as an environment variable named `GITHUB_KEY`.

> **❗Core team badges restriction**: You need to be a member of API Platform organization to retrieve API Platform teams. You can still locally launch the project, but the badges of the core team members will not appear.

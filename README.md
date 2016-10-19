# Calavera React Client

This is the client part of [Calavera](https://github.com/dunglas/calavera). It allows to create a nice website from a Git
repository containing [Markdown](https://daringfireball.net/projects/markdown/) docs.

## Features

* Renders a repository containing Markdown docs in HTML
* Exposes docs and metadata (authors, modification dates...) through a [JSON-LD](http://json-ld.org) API
* Single Page Application built with [React](https://facebook.github.io/react/), [Redux](http://redux.js.org/) and [React
  Router](https://github.com/ReactTraining/react-router)
* Universal Rendering (Server-Side Rendering)
* [Bootstrap](http://getbootstrap.com/) theme
* Edit on [GitHub](https://github.com) link
* [Google Analytics](https://analytics.google.com/) integration
* [Docker](http://docker.com/) setup
* Easy to customize

## Install

Be sure to have Docker installed on your machine the:

1. Install the client:

  `git clone https://github.com/dunglas/calavera-react-client`

2. Clone the Git repository containing Markdown files in the data directory:

  `git clone https://github.com/api-platform/docs data-src`

3. Generate .jsonld files using Calavera:

  `docker run -v $PWD/data-src:/in -v $PWD/src/static/data:/out dunglas/calavera /in /out`

4. Copy assets and images:

  `cd data-src && find . -not -name '*.md' -exec rsync -R {} ../src/static/data \; && cd -`

5. Install JS dependencies:

  `docker-compose run web npm install`

6. Start the container:

  `docker-compose up`

## Configuration

Features can be enabled or disabled using environment variables. If you use Docker, you can set them directly in the `docker-compose.yml`
file.

### Enable the “Edit on GitHub” link

You can define two environment variables to enable the “Edit on GitHub” link:

* `CALAVERA_GITHUB_DOCUMENTATION_REPOSITORY`: the path of the github repo (eg. `api-platform/docs`), with no trailing slash.
  If present, the “edit on github” link will be displayed.
* `CALAVERA_GITHUB_DOCUMENTATION_BRANCH`: the branch of the repo to link to (default to `master`)

## Enable the Google Analytics integration

Create a `CALAVERA_GOOGLE_ANALYTICS_ID` environment variable containing your Google Analytics ID (`UA-XXXXXXXX-1`) and the
Google Analytics integration will be enabled.

## Credits

Main authors: [Kévin Dunglas](http://dunglas.fr) and [Rodrigue Villetard](https://twitter.com/gorghoa).
Sponsored by [Les-Tilleuls.coop](http://les-tilleuls.coop).

Built using [React Redux Universal Hot Example](https://github.com/erikras/react-redux-universal-hot-example).

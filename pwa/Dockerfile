#syntax=docker/dockerfile:1.4
# Base stage for dev and build
FROM node:18-alpine as builder_base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat bash git

WORKDIR /srv/app

RUN npm install --global corepack@latest && \
	corepack enable && \
	corepack prepare --activate pnpm@latest && \
	pnpm config -g set store-dir /.pnpm-store

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during dev and build.
# ENV NEXT_TELEMETRY_DISABLED 1

FROM php as php_documentation_generator

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apt-get update && apt-get install -y gnupg git libzip-dev zip
COPY --from=composer /usr/bin/composer /usr/bin/composer
# this is used to preload data see phpwasm
RUN git clone -b main --single-branch --depth=1 https://github.com/api-platform/core core.docs && \
	 cd core.docs/docs && \
     composer global require soyuka/pmu && \
     composer global config allow-plugins.soyuka/pmu true --no-interaction && \
     composer global link . --permanent

FROM soyuka/php-wasm:8.2.9 as phpwasm
# We want soyuka/php-wasm to compile without js optimisation so that we can `sed`
ENV OPTIMIZE=-O1
RUN rm -rf /src # TODO php-wasm leftovers
COPY --from=php_documentation_generator core.docs/docs /src
WORKDIR /build
RUN python3 /emsdk/upstream/emscripten/tools/file_packager.py php-web.data --use-preload-cache --lz4 --preload "/src" --js-output=php-web.data.js --no-node --exclude '*Tests*' 'composer.lock' 'adr' '*features*' '*dist*' '*/.*' --export-name=createPhpModule

# Deps stage, preserve dependencies in cache as long as the lockfile isn't changed
FROM builder_base AS deps

COPY pnpm-lock.yaml ./
RUN pnpm fetch

COPY --link . .
RUN pnpm install --offline --frozen-lock

# Development image
FROM deps as dev
COPY --from=phpwasm --link --chown=1001:1001 /build/php-web.data ./public/php-web.data
COPY --from=phpwasm --link --chown=1001:1001 /build/php-web.wasm ./public/php-web.wasm
COPY --from=phpwasm --link --chown=1001:1001 /build/php-web.wasm ./app/playground/utils/
COPY --from=phpwasm --link --chown=1001:1001 /build/php-web.data.js /build/php-web.data.js
COPY --from=phpwasm --link --chown=1001:1001 /build/php-web.mjs /build/php-web.mjs
RUN sed '/--pre-js/r /build/php-web.data.js' /build/php-web.mjs > ./app/playground/utils/php-web.mjs

EXPOSE 3000
ENV PORT 3000

CMD ["sh", "-c", "pnpm install --offline --frozen-lock; pnpm dev"]


FROM builder_base AS builder

COPY --link . .
COPY --from=deps --link /srv/app/node_modules ./node_modules
COPY --from=phpwasm --link --chown=1001:1001 /build/php-web.data ./public/php-web.data
COPY --from=phpwasm --link --chown=1001:1001 /build/php-web.wasm ./public/php-web.wasm
COPY --from=phpwasm --link --chown=1001:1001 /build/php-web.wasm ./app/playground/utils/
COPY --from=phpwasm --link --chown=1001:1001 /build/php-web.data.js /build/php-web.data.js
COPY --from=phpwasm --link --chown=1001:1001 /build/php-web.mjs /build/php-web.mjs
RUN sed '/--pre-js/r /build/php-web.data.js' /build/php-web.mjs > ./app/playground/utils/php-web.mjs

ARG NEXT_ROOT_URL
ENV NEXT_ROOT_URL=$NEXT_ROOT_URL
# RUN echo $NEXT_ROOT_URL

RUN --mount=type=secret,id=GITHUB_KEY \
	export GITHUB_KEY=$(cat /run/secrets/GITHUB_KEY) ; \
	if [ -z "$GITHUB_KEY" ]; then \
		 echo "Please set the GITHUB_KEY secret" && exit 1 ; \
	fi  \
	&& npm i ts-node && npm run prebuild

# ADD https://soyuka.me/contributors.json ./data/contributors.json

RUN --mount=type=secret,id=GITHUB_KEY \
	export GITHUB_KEY=$(cat /run/secrets/GITHUB_KEY) ; \
	if [ -z "$GITHUB_KEY" ]; then \
		 echo "Please set the GITHUB_KEY secret" && exit 1 ; \
	fi  \
	&& npx next telemetry disable && pnpm run build

RUN --mount=type=secret,id=GITHUB_KEY \
	export GITHUB_KEY=$(cat /run/secrets/GITHUB_KEY) ; \
	if [ -z "$GITHUB_KEY" ]; then \
		 echo "Please set the GITHUB_KEY secret" && exit 1 ; \
	fi  \
	&& npm i ts-node && npm run postbuild

# Production image, copy all the files and run next
FROM node:18-alpine AS prod
WORKDIR /srv/app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --link /srv/app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --link --chown=1001:1001 /srv/app/.next/standalone ./
COPY --from=builder --link --chown=1001:1001 /srv/app/public/* ./public/
COPY --from=builder --link --chown=1001:1001 /srv/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]

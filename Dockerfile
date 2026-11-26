# syntax=docker/dockerfile:1

# using alpine base image to avoid `sharp` memory leaks.
# @see https://sharp.pixelplumbing.com/install#linux-memory-allocator

# build
FROM node:26-alpine AS build

ARG PNPM_VERSION=12.23.0
RUN npm install --global "pnpm@${PNPM_VERSION}"

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

USER node

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm fetch
RUN CI=true pnpm install --frozen-lockfile --offline

COPY --chown=node:node ./ ./

ARG PUBLIC_APP_BASE_PATH
ARG PUBLIC_APP_BASE_URL
ARG PUBLIC_BOTS
ARG PUBLIC_GOOGLE_SITE_VERIFICATION
ARG PUBLIC_MATOMO_BASE_URL
ARG PUBLIC_MATOMO_ID
ARG PUBLIC_REDMINE_ID

ENV NODE_ENV=production

RUN pnpm run build

# serve
FROM caddy:2-alpine AS serve

ARG PUBLIC_APP_BASE_PATH
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv/site${PUBLIC_APP_BASE_PATH}/
COPY --from=build /app/dist/404.html /srv/errors/404.html

EXPOSE 3000

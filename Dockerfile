FROM node:16-alpine

ENV NODE_ENV production

##
# Prepare system dependencies
##

RUN apk add --no-cache bash ca-certificates git openssh-client

##
# Build app dependencies
##

USER root
WORKDIR /app
COPY package.json yarn.lock /app/
# Setup SSH access
RUN --mount=type=ssh mkdir -p -m 0600 ~/.ssh &&  \
    ssh-keyscan github.com >> ~/.ssh/known_hosts && \
    echo -e '[url "git@github.com:wowswap-io/"]\n  insteadOf = https://github.com/wowswap-io/' > /root/.gitconfig && \
    # Build
    mkdir /yarncache && \
    yarn install --production --network-concurrency 1 --cache-folder /yarncache --frozen-lockfile && \
    yarn cache clean && \
    rm -rf /yarncache

##
# Buid app
##

COPY . /app/
RUN yarn build && \
    mkdir /app/.snapshot

##
# Prepare for execution
##

ENV PORT=3000
EXPOSE 3000/tcp
HEALTHCHECK --interval=30s CMD ["/usr/bin/wget", "-q", "--spider", "http://localhost:3000/health"]

VOLUME "/app/.snapshot"
CMD ["/usr/local/bin/node", "lib/app.js"]

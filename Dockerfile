FROM node:22-bullseye-slim AS builder-base

WORKDIR /home/node/app

# Install dependencies first so rebuild of these layers is only needed when dependencies change
COPY package.json yarn.lock .
COPY .env.prod* .env

RUN apt-get update -y && apt-get install -y git && rm -rf /var/lib/apt/lists/* && git clone --branch master --single-branch --depth 1 https://github.com/wwWallet/wallet-common.git /lib/wallet-common

WORKDIR /lib/wallet-common
RUN yarn install && yarn build


WORKDIR /home/node/app
# Overwrite wallet-common with the remote master branch
RUN yarn cache clean -f && yarn add /lib/wallet-common && yarn install

FROM builder-base AS test

COPY . .
COPY .env.prod* .env
# Fail if .env is missing entirely
RUN --mount=type=secret,id=wallet_frontend_envfile,dst=/home/node/app/.env,required=false ls .env
# The secret is optional, but will override the .env if it exists. If the .env file already exists and secret is mounted, the secret will override the file. 
RUN --mount=type=secret,id=wallet_frontend_envfile,dst=/home/node/app/.env,required=false npm run vitest


FROM builder-base AS builder

# This is just to make the builder stage depend on the test stage.
COPY --from=test /home/node/app/package.json /dev/null

COPY . .
COPY .env.prod* .env
# Fail if .env is missing entirely
RUN --mount=type=secret,id=wallet_frontend_envfile,dst=/home/node/app/.env,required=false ls .env
# The secret is optional. If the .env file already exists and secret is mounted, the secret will override the file. 
RUN --mount=type=secret,id=wallet_frontend_envfile,dst=/home/node/app/.env,required=false yarn build


FROM nginx:alpine AS deploy

WORKDIR /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/node/app/dist/ .

EXPOSE 80

CMD nginx -g "daemon off;"

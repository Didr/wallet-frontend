FROM node:22-trixie AS builder-base

WORKDIR /home/node/app

# Install dependencies first so rebuild of these layers is only needed when dependencies change
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.yarn \
	yarn config set cache-folder /root/.yarn && \
  yarn install --frozen-lockfile 

FROM builder-base AS test

COPY . .
## FIXME: Tests are not working, disable for now
# RUN --mount=type=secret,id=wallet_frontend_envfile,dst=/home/node/app/.env,required=false \
# 	yarn test

FROM test AS builder

# Changing the secret won't invalidate the build cache
RUN --mount=type=secret,id=wallet_frontend_envfile,dst=/home/node/app/.env,required=false \
  NODE_OPTIONS=--max-old-space-size=2048 yarn build

# use `docker buildx build --target copy-dist -o dist .` to copy the dist folder to the host
FROM scratch AS copy-dist
COPY --from=builder /home/node/app/dist/ /

FROM nginx:alpine AS deploy

WORKDIR /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/node/app/dist/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

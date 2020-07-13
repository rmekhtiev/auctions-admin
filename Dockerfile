FROM node:dubnium-alpine as builder

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN  apk add --no-cache curl git
RUN cd /tmp && \
  curl -#L https://github.com/tj/node-prune/releases/download/v1.0.1/node-prune_1.0.1_linux_amd64.tar.gz | tar -xvzf- && \
  mv -v node-prune /usr/local/bin && rm -rvf * && \
  echo "yarn cache clean && node-prune" > /usr/local/bin/node-clean && chmod +x /usr/local/bin/node-clean

ADD package.json yarn.lock ./

#RUN cp .env.example .env
RUN yarn install --frozen-lockfile --non-interactive && node-clean

# copy the app, note .dockerignore
ADD . ./

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn run build --modern
# RUN node-prune

FROM node:dubnium-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

ARG ARG_NODE_ENV=production
ENV NODE_ENV=${ARG_NODE_ENV}

ADD package.json ./
ADD nuxt.config.js ./
COPY --from=builder /usr/src/nuxt-app/tsconfig.json ./
COPY --from=builder /usr/src/nuxt-app/node_modules ./node_modules/
COPY --from=builder /usr/src/nuxt-app/.nuxt ./.nuxt/
COPY --from=builder /usr/src/nuxt-app/static ./static/
COPY --from=builder /usr/src/nuxt-app/store ./store/

# expose 5000 on container
EXPOSE 5000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

# start the app
CMD [ "yarn", "start", "--modern"]

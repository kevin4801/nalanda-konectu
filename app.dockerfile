FROM node:alpine

ARG NEXT_PUBLIC_WS_URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /home/perplexica

# Copy package.json and yarn.lock first, install dependencies
COPY ui/package.json ui/yarn.lock ./
RUN yarn install

# Install next globally
RUN yarn global add next

# Copy the rest of the application files
COPY ui /home/perplexica

# Ensure that yarn global binaries are in PATH
ENV PATH /home/node/.yarn/bin:/home/node/.config/yarn/global/node_modules/.bin:$PATH

CMD ["yarn", "dev"]

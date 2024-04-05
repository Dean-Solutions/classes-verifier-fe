FROM node:20-alpine

WORKDIR /deans_fe

COPY package.json ./

RUN corepack enable pnpm

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
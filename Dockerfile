FROM node:20-alpine

WORKDIR /deans_fe

COPY package.json ./

RUN corepack enable pnpm

RUN pnpm install

COPY . .

ENV PORT=8080

EXPOSE 8080

RUN pnpm build

CMD ["pnpm", "start"]
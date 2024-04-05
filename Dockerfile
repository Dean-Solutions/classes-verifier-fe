FROM node:20-alpine

WORKDIR /deans_fe

COPY package.json ./

RUN corepack enable pnpm

RUN pnpm install

COPY . .

ENV NEXTAUTH_URL=http://localhost:3000
ENV API_URL=http://dean-be:8080

EXPOSE 3000

CMD ["pnpm", "run", "dev"]